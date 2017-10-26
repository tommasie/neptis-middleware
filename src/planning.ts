import * as _ from 'lodash';
import * as rp from 'request-promise';
import * as fs from 'fs';
import * as async from 'async';
import {logger}   from './config/logger';
const shelljs = require('shelljs');
var LineByLineReader = require('line-by-line');
import {config} from './config/config'
//variable to hold the regular expression to match the ids of newlyPOSTed resources
var regex = /\d+$/g;

let serverName = config.serverUrl;

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
        this.problemFile = "/home/thomas/problems/city/" + this.city + "_problem" + ".pddl";
        this.domainFile = "/home/thomas/problems/city/" + this.city + "_domain" + ".pddl";
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

    writeDomainFile(cb) {
        let domainHeader = "(define (domain City)\n\t(:requirements :typing :equality)\n\t(:types topology_state visit_state - state attraction)\n\t" +
        "(:predicates\n\t\t(cur_state ?s - state)\n\t\t(visited ?a - attraction)\n\t)\n\t(:functions\n\t\t(total-cost)\n\t)\n\t";
        async.series([
            //Write the header of the domain file
            callback => {
                fs.writeFileSync(this.domainFile, domainHeader, 'utf8');
                callback();
            },
            callback => {
                //TODO set cityId
                let urlSensing = serverName + "sensing/city/" + this.computeAttractions[0]['city_id'];
                rp.get({uri: urlSensing, json:true})
                .then(body => {
                    let action = "";
                    let cost = 0;
                    if(body.length === 0) {
                        cost = 10;
                        this.computeAttractions.forEach(attraction => {
                            let id = attraction.id;
                            for (let j = 0; j < this.visits; j++) {
                                action += "(:action visit-v" + j + "-" + id + "\n\t\t";
                                action += ":precondition (and (cur_state top_" + id + ") (cur_state v" + j + ") (not (visited att_" + id + ")))\n\t\t";
                                action += ":effect (and (cur_state v" + (j + 1) + ") (not (cur_state v" + j + ")) (visited att_" + id +") (increase (total-cost) " + cost +"))\n\t)\n\t";
                            }
                        })
                        fs.appendFileSync(this.domainFile, action, 'utf8');
                    }
                    else {
                        this.exclude.forEach(excluded => {
                            delete body[excluded];
                        });
                        Object.keys(body).forEach(id => {
                            cost = body[id];
                            for (let j = 0; j < this.visits; j++) {
                                action += "(:action visit-v" + j + "-" + id + "\n\t\t";
                                action += ":precondition (and (cur_state top_" + id + ") (cur_state v" + j + ") (not (visited att_" + id + ")))\n\t\t";
                                action += ":effect (and (cur_state v" + (j + 1) + ") (not (cur_state v" + j + ")) (visited att_" + id +") (increase (total-cost) " + cost +"))\n\t)\n\t";
                            }
                        });
                        fs.appendFileSync(this.domainFile, action, 'utf8');
                    }
                    callback();
                })
            },
        ]);
        cb();
    }
    //Ottieni le distanze tra le varie attrazioni da Google
    getDistanceBetweenAttractions(loc1: cityattraction, loc2: cityattraction) {
        let reqUrl = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + loc1.lat + "," + loc1.lng;
        reqUrl += "&destinations=" + loc2.lat + "," + loc2.lng;
        reqUrl += "&language=it-IT&mode=walking&key=" + config.googleKey;
        rp.post({
            uri: reqUrl,
            json: true
        })
        .then(body => {
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
        });
    }
    //Ottieni la distanza dalle coordinate correnti dell'utente
    distanceFromCurrent(destination: cityattraction) {
        let reqUrl = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + this.lat + "," + this.lng;
        reqUrl += "&destinations=" + destination.lat + "," + destination.lng;
        reqUrl += "&language=it-IT&mode=walking&key=" + config.googleKey;
        rp.post({
            uri: reqUrl,
            json: true
        })
        .then(body => {
            if (body.status === 'OK') {
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
        fs.appendFileSync(this.domainFile, "\n)", 'utf-8');
    }

    computePlan(res, attractions) {
        shelljs.cd('/home/thomas/planners/downward');
        logger.debug("domain file:",this.domainFile);
        logger.debug("problem file:", this.problemFile);
        var solutionOutput = "/home/thomas/planners/solution/" + this.city + ".sol";
        var ff = " --heuristic \"hff=ff()\" --search \"lazy_greedy([hff], preferred=[hff])\"";
        var astar = " --search \"astar(blind())\"";
        var exec_string = "./fast-downward.py --build release64 ";
        exec_string += this.domainFile + " " + this.problemFile + astar;
        exec_string += " > " + solutionOutput;
        shelljs.exec(exec_string, function(status, output) {
            if (status !== 0) {
                return;
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
                    name: this.city,
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
                logger.debug("ready: " + JSON.stringify(outputObject));
                //res.status(200);
                //res.send(JSON.stringify(outputObject));

                shelljs.exec('rm ' + solutionOutput, function(status, output) {
                    if (status) logger.debug("error during delete solution file");
                    else logger.debug("file solution deleted successfully");
                });
                res.send(outputObject);
            });

        }); //fine exec
    }

    exec(res): void {
        this.requestAttractions().then(body => {
            this.filterAttractions(body);
            async.series([
                callback => {
                    this.writeProblemFile();
                    callback();
                },
                callback => {
                    this.writeDomainFile(callback);
                },
                callback => {
                    for(let i = 0; i < this.computeAttractions.length - 1; i++) {
                        this.getDistanceBetweenAttractions(this.computeAttractions[i], this.computeAttractions[i+1]);
                    }
                    for(let i = 0; i < this.computeAttractions.length; i++) {
                        this.distanceFromCurrent(this.computeAttractions[i]);
                    }
                    setTimeout(callback,1500);
                },
                callback => {
                    this.finalizeDomain();
                    callback();
                },
                callback => {
                    this.computePlan(res, this.computeAttractions);
                    callback();
                }
            ])

        })
    }
}

interface cityattraction {
    id: number;
    lat: number;
    lng: number;
    radius: number;
}

export class MuseumPlanning {
    private problemFile: string;
    private domainFile: string;

    private museumData;
    private rooms: room[];
    private attractions: museumattraction[];
    private computeAttractions: museumattraction[];

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
        this.problemFile = "/home/thomas/problems/museum/" + this.museum + "_problem" + ".pddl";
        this.domainFile = "/home/thomas/problems/museum/" + this.museum + "_domain" + ".pddl";
    }

    requestAttractions(): rp.RequestPromise {
        return rp.get({
            uri: serverName + "museums/" + this.id,
            json:true
        });
    }

    filterAttractions(museum) {
        this.museumData = museum;
        logger.debug(museum);
        museum.rooms.forEach(room => {
            this.rooms.push(room);
            this.computeAttractions.concat(room.attraction_ms.filter(attraction => {
                if(this.exclude.indexOf(attraction.id) == -1) {
                    this.attr2room[attraction.id] = room.id;
                    return true;
                }
                return false;
            }));
        });
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

        problemData += "(:init\n\t\t(cur_state " + this.museumData.room_start + ")\n\t\t(cur_state v0)\n\n\t\t(= (total-cost) 0)\n\t)\n\n\t";
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

    writeDomainFile() {
        let domainHeader = "(define (domain Museum)\n\t(:requirements :typing :equality)\n\t(:types topology_state visit_state - state attraction)\n\t" +
        "(:predicates\n\t\t(cur_state ?s - state)\n\t\t(visited ?a - attraction)\n\t)\n\t(:functions\n\t\t(total-cost)\n\t)\n\t";
        var attractionsTimeMap = {};
        async.series([
            //Write the header of the domain file
            callback => {
                fs.writeFileSync(this.domainFile, domainHeader, 'utf8');
                callback();
            },
            callback => {
                //TODO set cityId
                let urlSensing = serverName + "sensing/museum/" + this.id;
                rp.get({uri: urlSensing, json:true})
                .then(body => {
                    let action = "";
                    let cost = 0;
                    if(body.length === 0) {
                        cost = 10;
                        this.computeAttractions.forEach(attraction => {
                            let id = attraction.id;
                            for (let j = 0; j < this.visits; j++) {
                                action += "(:action visit-v" + j + "-" + id + "\n\t\t";
                                action += ":precondition (and (cur_state top_" + this.attr2room[id] + ") (cur_state v" + j + ") (not (visited att_" + id + ")))\n\t\t";
                                action += ":effect (and (cur_state v" + (j + 1) + ") (not (cur_state v" + j + ")) (visited att_" + id +") (increase (total-cost) " + cost +"))\n\t)\n\t";
                            }
                        })
                        fs.appendFileSync(this.domainFile, action, 'utf-8');
                    }
                    else {
                        Object.keys(body).forEach(id => {
                            cost = body[id];
                            for (let j = 0; j < this.visits; j++) {
                                action += "(:action visit-v" + j + "-" + id + "\n\t\t";
                                action += ":precondition (and (cur_state top_" + this.attr2room[id] + ") (cur_state v" + j + ") (not (visited att_" + id + ")))\n\t\t";
                                action += ":effect (and (cur_state v" + (j + 1) + ") (not (cur_state v" + j + ")) (visited att_" + id +") (increase (total-cost) " + cost +"))\n\t)\n\t";
                            }
                        });
                        fs.appendFileSync(this.domainFile, action, 'utf-8');
                    }
                    callback();
                })
            },
            callback => {
                //scrivi le adiacenze e i tempi
                rp.get({uri:serverName + "room/adjacency/" + this.id, json:true})
                .then(response => {
                    console.log(response);
                    let move = "";
                    Object.keys(response).forEach(key => {
                        let src = response[key]['room1_id'];
                        let next = response[key]['room2_id'];
                        let minutes = 1;
                        move =  "(:action move-" + src + "-" + next + "\n\t\t";
                        move += ":precondition (cur_state " + src + ")\n\t\t";
                        move += ":effect (and (cur_state " + next + ") (not(cur_state " + src + ")) ";
                        move += "(increase (total-cost) " + minutes + "))\n\t)\n\t";
                    });
                    fs.appendFileSync(this.domainFile, move, 'utf8');
                    callback();
                })
            }
        ]);

    }

    finalizeDomain() {
        fs.appendFileSync(this.domainFile, "\n)", 'utf-8');
    }

    computePlan(res) {
        shelljs.cd('/home/thomas/planners/downward');
        logger.debug("domain file:", this.domainFile);
        logger.debug("problem file:", this.problemFile);
        var solutionOutput = "/home/thomas/planners/solution/" + this.museum + ".sol";
        var ff = " --heuristic \"hff=ff()\" --search \"lazy_greedy([hff], preferred=[hff])\"";
        var astar = " --search \"astar(blind())\"";
        var exec_string = "./fast-downward.py --build release64 ";
        exec_string += this.domainFile + " " + this.problemFile + astar;
        exec_string += " > " + solutionOutput;
        logger.debug("exec string:", exec_string);
        //shelljs.exec(exec_string, {silent:true}, function(status, output) {
        shelljs.exec(exec_string, function(status, output) {
            if (status !== 0) {
                return res.sendStatus(500);
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
                    name : name,
                    route : outputList,
                    id : ""
                };
                for(let i = 0; i < visits.length; i++) {
                    let attraction;
                    this.computeAttractions.forEach(attr => {
                        if(attr.id == +visits[i]) {
                            attraction = attr;
                        }
                    });
                    var obj = {
                        name: attraction.name,
                        radius: attraction.radius,
                        rating: attraction.rating,
                        room: this.attr2room[attraction.id].name,
                        id: attraction.id
                    }
                    outputList.push(obj);
                }
                // All lines are read, file is closed now.
                logger.info("End");
                logger.debug("ready: " + JSON.stringify(obj));

                shelljs.exec('rm ' + solutionOutput, function(status, output) {
                    if (status)
                    logger.debug("error during delete solution file");
                    else logger.debug("file solution deleted successfully");
                });
                return obj;
            });
        }); //fine exec*/
    }

    exec(res): void {
        this.requestAttractions().then(body => {
            this.filterAttractions(body);
            async.series([
                callback => {
                    this.writeProblemFile();
                    callback();
                },
                callback => {
                    this.writeDomainFile();
                    callback();
                },
                callback => {
                },
                callback => {
                    this.finalizeDomain();
                    callback();
                }

            ])

            this.computePlan(res);
        })
    }
}

interface room {
    id:number,
    attractions: museumattraction[]
}

interface museumattraction {
    id: number;
}
