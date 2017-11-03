import * as _ from 'lodash';
import * as rp from 'request-promise';
import * as fs from 'fs';
import {logger}   from './config/logger';
const shelljs = require('shelljs');
var LineByLineReader = require('line-by-line');
const config = require('../config/config.json');
const serverName = config.DBUrl;
//variable to hold the regular expression to match the ids of newlyPOSTed resources
var regex = /\d+$/g;

export class CityPlanning {

    private problemFile: string;
    private domainFile: string;

    private attractions: cityattraction[];
    private computeAttractions: cityattraction[];
    constructor(
        private city: string,
        private region: string,
        private visits: number,
        private must: number[],
        private exclude: number[],
        private lat: number,
        private lng: number,
    ) {
        this.attractions = [];
        this.computeAttractions = [];
        this.problemFile = config.problemsFolder + "city/" + this.city + "_problem" + ".pddl";
        this.domainFile = config.problemsFolder + "city/" + this.city + "_domain" + ".pddl";
    }

    requestAttractions(): rp.RequestPromise {
        return rp.get({
            uri: serverName + "attractionc/planning?name=" + this.city + "&region=" + this.region,
            json:true
        });
    }

    filterAttractions(attractions) {
        Object.keys(attractions).forEach(key => {
            this.attractions.push(attractions[key]);
        });
        //escludi le attrazioni comprese nell'array exclude
        this.computeAttractions = this.attractions.filter(attraction => {
            //Se l'attrazione non è in exclude, l'indice sarà -1
            return this.exclude.indexOf(attraction.id) == -1;
        });
    }

    writeProblemFile() {
        let problemData: string;
        problemData = "(define (problem Visit) (:domain City)\n\t(:objects\n\t\tstart ";

        this.computeAttractions.forEach(attraction => {
            problemData += "top_" + attraction.id + " ";
        });
        problemData += "- topology_state\n\t\t";

        for(let i = 0; i <= this.visits; i++)
        problemData += "v" + i + " ";
        problemData += "- visit_state\n\t\t";

        this.computeAttractions.forEach(attraction => {
            problemData += "att_" + attraction.id + " ";
        });
        problemData += "- attraction\n\t)\n\t";

        problemData += "(:init\n\t\t(cur_state start)\n\t\t(cur_state v0)\n\n\t\t(= (total-cost) 0)\n\t)\n\n\t";
        problemData += "(:goal\n\t\t(and\n\t\t\t(cur_state v" + this.visits + ")\n\t\t\t";

        this.must.forEach(attractionId => {
            problemData += "(visited att_" + attractionId + ")\n\t\t";
        })

        problemData += "\n\t\t)\n\t)\n\t(:metric minimize (total-cost))\n)";
        fs.writeFile(this.problemFile, problemData, 'utf8', err => {
            if(err) throw err;
            logger.info("Problem file has been written");
        });

    }

    writeDomainHeader() {
        let domainHeader = "(define (domain City)\n\t(:requirements :typing :equality)\n\t(:types topology_state visit_state - state attraction)\n\t" +
        "(:predicates\n\t\t(cur_state ?s - state)\n\t\t(visited ?a - attraction)\n\t)\n\t(:functions\n\t\t(total-cost)\n\t)\n\t";
        return new Promise((resolve, reject) => {
            fs.writeFile(this.domainFile, domainHeader, 'utf8', err => {
                if(err) reject(err);
                else resolve();
            });
        });
    }

    writeVisitActions(sensing) {
        let action = "";
        let cost = 0;
        if(sensing.length === 0) {
            cost = 10;
            this.computeAttractions.forEach(attraction => {
                let id = attraction.id;
                for (let j = 0; j < this.visits; j++) {
                    action += "(:action visit-v" + j + "-" + id + "\n\t\t";
                    action += ":precondition (and (cur_state top_" + id + ") (cur_state v" + j + ") (not (visited att_" + id + ")))\n\t\t";
                    action += ":effect (and (cur_state v" + (j + 1) + ") (not (cur_state v" + j + ")) (visited att_" + id +") (increase (total-cost) " + cost +"))\n\t)\n\t";
                }
            })
            return new Promise((resolve, reject) => {
                fs.appendFile(this.domainFile, action, 'utf8', err => {
                    if(err) reject(err);
                    else resolve();
                });
            });
        }
        else {
            this.exclude.forEach(excluded => {
                delete sensing[excluded];
            });
            Object.keys(sensing).forEach(id => {
                cost = sensing[id];
                for (let j = 0; j < this.visits; j++) {
                    action += "(:action visit-v" + j + "-" + id + "\n\t\t";
                    action += ":precondition (and (cur_state top_" + id + ") (cur_state v" + j + ") (not (visited att_" + id + ")))\n\t\t";
                    action += ":effect (and (cur_state v" + (j + 1) + ") (not (cur_state v" + j + ")) (visited att_" + id +") (increase (total-cost) " + cost +"))\n\t)\n\t";
                }
            });
            return new Promise((resolve, reject) => {
                fs.appendFile(this.domainFile, action, 'utf8', err => {
                    if(err) reject(err);
                    else resolve();
                });
            });
        }
    }

    writeMoveActions() {
        for(let i = 0; i < this.computeAttractions.length - 1; i++) {
            this.getDistanceBetweenAttractions(this.computeAttractions[i], this.computeAttractions[i+1]);
        }
        for(let i = 0; i < this.computeAttractions.length; i++) {
            this.distanceFromCurrent(this.computeAttractions[i]);
        }
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(),1500);
        });
    }

    //Ottieni le distanze tra le varie attrazioni da Google
    getDistanceBetweenAttractions(loc1: cityattraction, loc2: cityattraction) {
        let reqUrl = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + loc1.latitude + "," + loc1.longitude;
        reqUrl += "&destinations=" + loc2.latitude + "," + loc2.longitude;
        reqUrl += "&language=it-IT&mode=walking&key=" + config.googleKey;
        rp.post({
            uri: reqUrl,
            json: true
        })
        .then(body => {
            logger.debug(body);
            if (body.status === 'OK') {
                let time = body.rows[0].elements[0].duration.value;
                time = +time;
                let minutes = Math.ceil(time / 60);
                //TODO salva le distanze nel DB, idealmente calcolale quando vengono aggiunte
                //addTmoveAtCity(sorgId, destId, minutes, dd);
                var string;
                string = "(:action move-" + loc1.id + "-" + loc2.id + "\n\t\t";
                string += ":precondition (cur_state top_" + loc1.id + ")\n\t\t";
                string += ":effect (and (cur_state top_" + loc2.id + ") (not(cur_state top_" + loc1.id + ")) ";
                string += "(increase (total-cost) " + minutes + "))\n\t)\n\t";
                string = "(:action move-" + loc2.id + "-" + loc1.id + "\n\t\t";
                string += ":precondition (cur_state top_" + loc2.id + ")\n\t\t";
                string += ":effect (and (cur_state top_" + loc1.id + ") (not(cur_state top_" + loc2.id + ")) ";
                string += "(increase (total-cost) " + minutes + "))\n\t)\n\t";
                fs.appendFileSync(this.domainFile, string, 'utf8');
            }
        }).catch(err => {
            logger.debug(err);
        })
        ;
    }

    distanceFromCurrent(destination: cityattraction) {
        let reqUrl = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + this.lat + "," + this.lng;
        reqUrl += "&destinations=" + destination.latitude + "," + destination.longitude;
        reqUrl += "&language=it-IT&mode=walking&key=" + config.googleKey;
        rp.post({
            uri: reqUrl,
            json: true
        })
        .then(body => {
            if (body.status === 'OK') {
                logger.info(JSON.stringify(body));
                var time = body.rows[0].elements[0].duration.value;
                time = +time;
                var minutes = Math.ceil(time / 60);
                var string;
                string = "(:action move-start-" + destination.id + "\n\t\t";
                string += ":precondition (cur_state start)\n\t\t";
                string += ":effect (and (cur_state top_" + destination.id + ") (not(cur_state start)) ";
                string += "(increase (total-cost) " + minutes + "))\n\t)\n\t";
                fs.appendFileSync(this.domainFile,string,'utf8');
            }
        });
    }

    finalizeDomain() {
        return new Promise((resolve,reject) => {
            fs.appendFile(this.domainFile, "\n)", 'utf8', err => {
                if(err) reject(err);
                else resolve();
            });
        });
    }

    computePlan(attractions, city) {
        shelljs.cd(config.plannersFolder + 'downward');
        logger.info("domain file:", this.domainFile);
        logger.info("problem file:", this.problemFile);
        var solutionOutput = config.plannersFolder + "solution/" + this.city + ".sol";
        var ff = " --heuristic \"hff=ff()\" --search \"lazy_greedy([hff], preferred=[hff])\"";
        var astar = " --search \"astar(blind())\"";
        var exec_string = "./fast-downward.py --build release64 ";
        exec_string += this.domainFile + " " + this.problemFile + astar;
        exec_string += " > " + solutionOutput;
        return new Promise((resolve, reject) => {
            shelljs.exec(exec_string, function(status, output) {
                if (status !== 0) {
                    reject("Errore nel planner");
                }
                let lr = new LineByLineReader(solutionOutput);
                lr.on('error', function(err) {
                    logger.error(" 'err' contains error object x");
                    return;
                });

                var visits = [];
                lr.on('line', function(line) {
                    if(line.includes("visit")) {
                        visits.push(line.split('-')[2].split(' ')[0]);
                    }
                });

                lr.on('end', function() {
                    var outputList = [];
                    var outputObject = {
                        type : "city",
                        name: city,
                        route : outputList
                    };

                    for(let i = 0; i < visits.length; i++) {
                        let attraction;
                        attractions.forEach(attr => {
                            if(attr.id == +visits[i]) {
                                attraction = attr;
                            }
                        });
                        var obj = {
                            name: attraction.name,
                            coordinates: {latitude: attraction.latitude, longitude: attraction.longitude},
                            radius: attraction.radius,
                            rating: attraction.rating,
                            id: attraction.id
                        }
                        outputList.push(obj);
                    }
                    // All lines are read, file is closed now.
                    logger.info("End");
                    logger.info("ready: " + JSON.stringify(outputObject));

                    shelljs.exec('rm ' + solutionOutput, function(status, output) {
                        if (status) logger.info("error during delete solution file");
                        else logger.info("file solution deleted successfully");
                    });
                    resolve(outputObject);
                });

            }); //fine exec
        });

    }

    exec(res): void {
        this.requestAttractions().then(body => {
            return this.filterAttractions(body);
        }).then(() => {
            return this.writeProblemFile();
        }).then(() => {
            return this.writeDomainHeader();
        }).then(() => {
            let urlSensing = serverName + "sensing/city/" + this.computeAttractions[0]['city_id'];
            return rp.get({uri: urlSensing, json:true});
        }).then(sensing => {
            logger.info(sensing);
            return this.writeVisitActions(sensing);
        }).then(() => {
            return this.writeMoveActions();
        }).then(() => {
            return this.finalizeDomain();
        }).then(() => {
            return this.computePlan(this.computeAttractions, this.city);
        }).then(result => {
            res.send(result);
        }).catch(err => {
            res.status(500).send(err);
        });
    }

    getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
      var R = 6371; // Radius of the earth in km
      var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
      var dLon = this.deg2rad(lon2-lon1);
      var a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ;
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      var d = R * c; // Distance in km
      return d;
    }

    deg2rad(deg) {
      return deg * (Math.PI/180)
    }

}

interface cityattraction {
    id: number;
    latitude: number;
    longitude: number;
    radius: number;
}

export class MuseumPlanning {
    private problemFile: string;
    private domainFile: string;

    private museumData;
    private rooms: room[];
    private attractions: museumattraction[];
    private computeAttractions: museumattraction[];

    private adjacencies: object;
    private attr2room = {};
    constructor(
        private museum: string,
        private id: number,
        private visits: number,
        private must: number[],
        private exclude: number[],
    ) {
        this.rooms = [];
        this.attractions = [];
        this.computeAttractions = [];
        this.adjacencies = {};
        this.problemFile = config.problemsFolder + "museum/" + this.museum + "_problem" + ".pddl";
        this.domainFile = config.problemsFolder + "museum/" + this.museum + "_domain" + ".pddl";
    }

    requestAttractions(): rp.RequestPromise {
        return rp.get({
            uri: serverName + "museums/" + this.id,
            json:true
        });
    }

    requestAdjacencies() {
        return rp.get({
            uri:serverName + "room/adjacencies?museum=" + this.id,
            json:true
        });
    }

    filterAttractions(museum) {
        this.museumData = museum;
        museum.rooms.forEach(room => {
            this.rooms.push(room);
            this.computeAttractions = this.computeAttractions.concat(room.attraction_ms.filter(attraction => {
                if(this.exclude.indexOf(attraction.id) == -1) {
                    this.attr2room[attraction.id] = room.id;
                    return true;
                }
                return false;
            }));
        });
        return museum;
    }

    writeProblemFile() {
        let problemData: string;
        problemData = "(define (problem Visit) (:domain Museum)\n\t(:objects\n\t\t";

        this.rooms.forEach(room => {
            problemData += "top_" + room.id + " ";
        });
        problemData += "- topology_state\n\t\t";

        for(let i = 0; i <= this.visits; i++)
        problemData += "v" + i + " ";
        problemData += "- visit_state\n\t\t";

        this.computeAttractions.forEach(attraction => {
            problemData += "att_" + attraction.id + " ";
        });
        problemData += "- attraction\n\t)\n\t";

        problemData += "(:init\n\t\t(cur_state top_" + this.museumData.start + ")\n\t\t(cur_state v0)\n\n\t\t(= (total-cost) 0)\n\t)\n\n\t";
        problemData += "(:goal\n\t\t(and\n\t\t\t(cur_state v" + this.visits + ")\n\t\t\t";

        this.must.forEach(attractionId => {
            problemData += "(visited att_" + attractionId + ")\n\t\t";
        })

        problemData += "\n\t\t)\n\t)\n\t(:metric minimize (total-cost))\n)";
        return new Promise((resolve,reject) => {
            fs.writeFile(this.problemFile, problemData, 'utf8', err => {
                if(err) reject(err);
                logger.info("Problem file has been written");
                resolve();
            });
        });
    }

    writeDomainHeader() {
        let domainHeader = "(define (domain Museum)\n\t(:requirements :typing :equality)\n\t(:types topology_state visit_state - state attraction)\n\t" +
        "(:predicates\n\t\t(cur_state ?s - state)\n\t\t(visited ?a - attraction)\n\t)\n\t(:functions\n\t\t(total-cost)\n\t)\n\t";
        return new Promise((resolve, reject) => {
            fs.writeFile(this.domainFile, domainHeader, 'utf8', err => {
                if(err) reject(err);
                else resolve(domainHeader);
            })
        });
    }

    writeVisitActions(sensingData) {
        let action = "";
        let cost = 0;
        if(sensingData.length === 0) {
            cost = 10;
            this.computeAttractions.forEach(attraction => {
                let id = attraction.id;
                for (let j = 0; j < this.visits; j++) {
                    action += "(:action visit-v" + j + "-" + id + "\n\t\t";
                    action += ":precondition (and (cur_state top_" + this.attr2room[id] + ") (cur_state v" + j + ") (not (visited att_" + id + ")))\n\t\t";
                    action += ":effect (and (cur_state v" + (j + 1) + ") (not (cur_state v" + j + ")) (visited att_" + id +") (increase (total-cost) " + cost +"))\n\t)\n\t";
                }
            });
            return new Promise((resolve,reject) => {
                fs.appendFile(this.domainFile, action, 'utf-8', err => {
                    if(err) reject(err);
                    else resolve(action);
                });
            });

        }
        else {
            Object.keys(sensingData).forEach(id => {
                cost = sensingData[id];
                for (let j = 0; j < this.visits; j++) {
                    action += "(:action visit-v" + j + "-" + id + "\n\t\t";
                    action += ":precondition (and (cur_state top_" + this.attr2room[id] + ") (cur_state v" + j + ") (not (visited att_" + id + ")))\n\t\t";
                    action += ":effect (and (cur_state v" + (j + 1) + ") (not (cur_state v" + j + ")) (visited att_" + id +") (increase (total-cost) " + cost +"))\n\t)\n\t";
                }
            });
            return new Promise((resolve,reject) => {
                fs.appendFile(this.domainFile, action, 'utf-8', err => {
                    if(err) reject(err);
                    else resolve(action);
                });
            });
        }
    }

    writeMoveActions() {
        let minutes = 1;
        let move = "";
        Object.keys(this.museumData.adjacencies).forEach(s => {
            this.museumData.adjacencies[s].forEach(t => {
                move +=  "(:action move-" + s + "-" + t + "\n\t\t";
                move += ":precondition (cur_state " + s + ")\n\t\t";
                move += ":effect (and (cur_state " + t + ") (not(cur_state " + s + ")) ";
                move += "(increase (total-cost) " + minutes + "))\n\t)\n\t";
            });
        });
        return new Promise((resolve,reject) => {
            fs.appendFile(this.domainFile, move, 'utf8', err => {
                if(err) reject(err);
                else resolve(move);
            });
        });
    }



    finalizeDomain() {
        return new Promise((resolve,reject) => {
            fs.appendFile(this.domainFile, "\n)", 'utf8', err => {
                if(err) reject(err);
                else resolve("\n)");
            });
        });
    }

    computePlan(attractions, attr2room, museum) {
        shelljs.cd(config.plannersFolder + 'downward');
        logger.info("domain file:", this.domainFile);
        logger.info("problem file:", this.problemFile);
        var solutionOutput = config.plannersFolder + "solution/" + this.museum + ".sol";
        var ff = " --heuristic \"hff=ff()\" --search \"lazy_greedy([hff], preferred=[hff])\"";
        var astar = " --search \"astar(blind())\"";
        var exec_string = "./fast-downward.py --build release64 ";
        exec_string += this.domainFile + " " + this.problemFile + astar;
        exec_string += " > " + solutionOutput;
        logger.info("exec string:", exec_string);
        //shelljs.exec(exec_string, {silent:true}, function(status, output) {
        return new Promise((resolve, reject) => {
            shelljs.exec(exec_string, function(status, output) {
                if (status !== 0) {
                    throw new Error("errore nel planner");
                }
                let lr = new LineByLineReader(solutionOutput);
                lr.on('error', function(err) {
                    logger.error(" 'err' contains error object x");
                    return;
                });

                let visits = [];
                lr.on('line', function(line) {
                    if(line.includes("visit-v")) {
                        visits.push(line.split('-')[2].split(' ')[0]);
                    }
                });
                let outputList = [];
                lr.on('end', function() {
                    var outputObject = {
                        type : "museum",
                        name : museum,
                        route : outputList,
                        id : this.id
                    };
                    for(let i = 0; i < visits.length; i++) {
                        let attraction;
                        attractions.forEach(attr => {
                            if(attr.id == +visits[i]) {
                                attraction = attr;
                            }
                        });
                        var obj = {
                            name: attraction.name,
                            radius: attraction.radius,
                            rating: attraction.rating,
                            room: attr2room[attraction.id].name,
                            id: attraction.id
                        }
                        outputList.push(obj);
                    }
                    // All lines are read, file is closed now.
                    logger.info("End");
                    logger.info("ready: " + JSON.stringify(obj));

                    shelljs.exec('rm ' + solutionOutput, function(status, output) {
                        if (status)
                        logger.info("error during delete solution file");
                        else logger.info("file solution deleted successfully");
                    });
                    resolve(outputObject);
                });
            }); //fine exec*/
        });

    }

    exec(res): void {
        this.requestAttractions().then(body => {
            return this.filterAttractions(body);
        }).then(() => {
            return this.requestAdjacencies();
        }).then(adjacencies => {
            this.museumData = adjacencies;
            return this.writeProblemFile();
        }).then(() => {
            return this.writeDomainHeader();
        }).then(header => {
            let urlSensing = serverName + "sensing/museum/" + this.id;
            return rp.get({uri: urlSensing, json:true});
        }).then(sensing => {
            return this.writeVisitActions(sensing);
        }).then(() => {
            return this.writeMoveActions();
        }).then(() => {
            return this.finalizeDomain();
        }).then(() => {
            return this.computePlan(this.computeAttractions, this.attr2room, this.museum);
        }).then(result => {
            res.send(result);
        }).catch(err => {
            res.status(500).send(err);
        });
    }
}

interface room {
    id:number,
    attractions: museumattraction[]
}

interface museumattraction {
    id: number;
}
