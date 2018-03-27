import * as config from 'config';
import * as fs from 'fs';
import * as LineByLineReader from 'line-by-line';
import * as _ from 'lodash';
import * as rp from 'request-promise';
import * as shelljs from 'shelljs';
import { logger } from './config/logger';
import { Topology } from './museumTopology';
// const config = require('../config/config.json');
const dbServer = config.get('dbServer');

export class CityPlanning {

    private problemFile: string;
    private domainFile: string;

    private attractions: ICityAttraction[];
    private computeAttractions: ICityAttraction[];
    private times: {};
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
        this.problemFile = config.get('problemsFolder') + 'city/' + this.city + '_problem' + '.pddl';
        this.domainFile = config.get('problemsFolder') + 'city/' + this.city + '_domain' + '.pddl';
    }

    public requestAttractions(): rp.RequestPromise {
        return rp.get({
            json: true,
            uri: dbServer + 'attractionc/planning?name=' + this.city + '&region=' + this.region,
        });
    }

    public filterAttractions(attractions) {
        Object.keys(attractions).forEach((key) => {
            this.attractions.push(attractions[key]);
        });
        // escludi le attrazioni comprese nell'array exclude
        this.computeAttractions = this.attractions.filter((attraction) => {
            // Se l'attrazione non è in exclude, l'indice sarà -1
            return this.exclude.indexOf(attraction.id) === -1;
        });
    }

    public writeProblemFile() {
        let problemData: string;
        problemData = '(define (problem Visit) (:domain City)\n\t(:objects\n\t\tstart ';

        this.computeAttractions.forEach((attraction) => {
            problemData += 'top_' + attraction.id + ' ';
        });
        problemData += '- topology_state\n\t\t';

        for (let i = 0; i <= this.visits; i++) {
            problemData += 'v' + i + ' ';
        }
        problemData += '- visit_state\n\t\t';

        this.computeAttractions.forEach((attraction) => {
            problemData += 'att_' + attraction.id + ' ';
        });
        problemData += '- attraction\n\t)\n\t';

        problemData += '(:init\n\t\t(cur_state start)\n\t\t(cur_state v0)\n\n\t\t(= (total-cost) 0)\n\t)\n\n\t';
        problemData += '(:goal\n\t\t(and\n\t\t\t(cur_state v' + this.visits + ')\n\t\t\t';

        this.must.forEach((attractionId) => {
            problemData += '(visited att_' + attractionId + ')\n\t\t';
        });

        problemData += '\n\t\t)\n\t)\n\t(:metric minimize (total-cost))\n)';
        fs.writeFile(this.problemFile, problemData, 'utf8', (err) => {
            if (err) throw err;
            logger.info('Problem file has been written');
        });

    }

    public writeDomainHeader() {
        const domainHeader = '(define (domain City)\n\t(:requirements :typing :equality)\n\t(:types topology_state visit_state - state attraction)\n\t' +
            '(:predicates\n\t\t(cur_state ?s - state)\n\t\t(visited ?a - attraction)\n\t)\n\t(:functions\n\t\t(total-cost)\n\t)\n\t';
        return new Promise((resolve, reject) => {
            fs.writeFile(this.domainFile, domainHeader, 'utf8', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    }

    public writeVisitActions(sensing) {
        let action = '';
        let cost = 0;
        logger.debug(sensing);
        if (sensing.length === 0) {
            cost = 10;
            this.computeAttractions.forEach((attraction) => {
                const id = attraction.id;
                for (let j = 0; j < this.visits; j++) {
                    action += '(:action visit-v' + j + '-' + id + '\n\t\t';
                    action += ':precondition (and (cur_state top_' + id + ') (cur_state v' + j + ') (not (visited att_' + id + ')))\n\t\t';
                    action += ':effect (and (cur_state v' + (j + 1) + ') (not (cur_state v' + j + ')) (visited att_' + id + ') (increase (total-cost) ' + cost + '))\n\t)\n\t';
                }
            });
            return new Promise((resolve, reject) => {
                fs.appendFile(this.domainFile, action, 'utf8', (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
        } else {
            this.exclude.forEach((excluded) => {
                delete sensing[excluded];
            });
            Object.keys(sensing).forEach((id) => {
                cost = sensing[id];
                for (let j = 0; j < this.visits; j++) {
                    action += '(:action visit-v' + j + '-' + id + '\n\t\t';
                    action += ':precondition (and (cur_state top_' + id + ') (cur_state v' + j + ') (not (visited att_' + id + ')))\n\t\t';
                    action += ':effect (and (cur_state v' + (j + 1) + ') (not (cur_state v' + j + ')) (visited att_' + id + ') (increase (total-cost) ' + cost + '))\n\t)\n\t';
                }
            });
            return new Promise((resolve, reject) => {
                fs.appendFile(this.domainFile, action, 'utf8', (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
        }
    }

    public writeMoveActions() {
        for (let i = 0; i < this.computeAttractions.length - 1; i++) {
            this.getDistanceBetweenAttractions(this.computeAttractions[i], this.computeAttractions[i + 1]);
        }
        for (const attr of this.computeAttractions) {
            this.distanceFromCurrent(attr);
        }
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(), 1500);
        });
    }

    // Ottieni le distanze tra le varie attrazioni da Google
    public getDistanceBetweenAttractions(loc1: ICityAttraction, loc2: ICityAttraction) {
        let reqUrl = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + loc1.latitude + ',' + loc1.longitude;
        reqUrl += '&destinations=' + loc2.latitude + ',' + loc2.longitude;
        reqUrl += '&language=it-IT&mode=walking&key=' + config.get('googleKey');
        rp.post({
            json: true,
            uri: reqUrl,
        })
            .then((body) => {
                if (body.status === 'OK') {
                    let time = body.rows[0].elements[0].duration.value;
                    time = +time;
                    const minutes = Math.ceil(time / 60);
                    // TODO salva le distanze nel DB, idealmente calcolale quando vengono aggiunte
                    // addTmoveAtCity(sorgId, destId, minutes, dd);
                    let str;
                    str = '(:action move-' + loc1.id + '-' + loc2.id + '\n\t\t';
                    str += ':precondition (cur_state top_' + loc1.id + ')\n\t\t';
                    str += ':effect (and (cur_state top_' + loc2.id + ') (not(cur_state top_' + loc1.id + ')) ';
                    str += '(increase (total-cost) ' + minutes + '))\n\t)\n\t';
                    str = '(:action move-' + loc2.id + '-' + loc1.id + '\n\t\t';
                    str += ':precondition (cur_state top_' + loc2.id + ')\n\t\t';
                    str += ':effect (and (cur_state top_' + loc1.id + ') (not(cur_state top_' + loc2.id + ')) ';
                    str += '(increase (total-cost) ' + minutes + '))\n\t)\n\t';
                    fs.appendFileSync(this.domainFile, str, 'utf8');
                }
            }).catch((err) => {
                logger.debug(err);
            })
            ;
    }

    public distanceFromCurrent(destination: ICityAttraction) {
        let reqUrl = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + this.lat + ',' + this.lng;
        reqUrl += '&destinations=' + destination.latitude + ',' + destination.longitude;
        reqUrl += '&language=it-IT&mode=walking&key=' + config.get('googleKey');
        rp.post({
            json: true,
            uri: reqUrl,
        })
            .then((body) => {
                if (body.status === 'OK') {
                    logger.info(JSON.stringify(body));
                    let time = body.rows[0].elements[0].duration.value;
                    time = +time;
                    const minutes = Math.ceil(time / 60);
                    let str;
                    str = '(:action move-start-' + destination.id + '\n\t\t';
                    str += ':precondition (cur_state start)\n\t\t';
                    str += ':effect (and (cur_state top_' + destination.id + ') (not(cur_state start)) ';
                    str += '(increase (total-cost) ' + minutes + '))\n\t)\n\t';
                    fs.appendFileSync(this.domainFile, str, 'utf8');
                }
            });
    }

    public finalizeDomain() {
        return new Promise((resolve, reject) => {
            fs.appendFile(this.domainFile, '\n)', 'utf8', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    }

    public computePlan(attractions, city, times) {
        shelljs.cd(config.get('plannersFolder') + 'downward');
        logger.info('domain file:', this.domainFile);
        logger.info('problem file:', this.problemFile);
        const solFileName = this.city.toLowerCase().replace(/\s/g, '_');
        const solutionOutput = config.get('plannersFolder') + 'solution/' + solFileName + '.sol';
        const ff = ' --heuristic "hff=ff()" --search "lazy_greedy([hff], preferred=[hff])"';
        const astar = ' --search "astar(blind())"';
        let execString = './fast-downward.py --build release64 ';
        execString += this.domainFile + ' ' + this.problemFile + astar;
        execString += ' > ' + solutionOutput;
        logger.debug(execString);
        return new Promise((resolve, reject) => {
            shelljs.exec(execString, (status, output) => {
                if (status !== 0) {
                    reject('Errore nel planner');
                }
                const lr = new LineByLineReader(solutionOutput);
                lr.on('error', (err) => {
                    logger.error(" 'err' contains error object x");
                    return;
                });

                const visits = [];
                lr.on('line', (line) => {
                    if (line.includes('visit')) {
                        visits.push(line.split('-')[2].split(' ')[0]);
                    }
                });

                lr.on('end', () => {
                    const outputList = [];
                    const outputObject = {
                        name: city,
                        route: outputList,
                        type: 'city',
                    };
                    for (const visit of visits) {
                        logger.debug(visit);
                        let attraction;
                        logger.debug(attractions);
                        attractions.forEach((attr) => {
                            if (attr.id === visit) {
                                attraction = attr;
                            }
                        });
                        logger.debug(attraction);
                        attraction.picture = 'https://neptis-poleis.diag.uniroma1.it:9070/public/img/' + attraction.picture;
                        const obj = {
                            coordinates: { latitude: attraction.latitude, longitude: attraction.longitude },
                            description: attraction.description,
                            id: attraction.id,
                            name: attraction.name,
                            picture: attraction.picture,
                            radius: attraction.radius,
                            rating: attraction.rating,
                            time: times[attraction.id],
                        };
                        outputList.push(obj);
                    }
                    // All lines are read, file is closed now.
                    let totalTime = 0;
                    outputList.forEach((item) => {
                        totalTime += item.time;
                    });
                    logger.info('End');
                    logger.info('ready: ' + JSON.stringify(outputObject));

                    shelljs.exec('rm ' + solutionOutput, (s, o) => {
                        if (s) logger.info('error during delete solution file');
                        else logger.info('file solution deleted successfully');
                    });
                    resolve(outputObject);
                });
            }); // fine exec
        });

    }

    public exec(res): void {
        this.requestAttractions().then((body) => {
            return this.filterAttractions(body);
        }).then(() => {
            return this.writeProblemFile();
        }).then(() => {
            return this.writeDomainHeader();
        }).then(() => {
            const urlSensing = dbServer + 'sensing/city/' + this.computeAttractions[0].city_id;
            return rp.get({ uri: urlSensing, json: true });
        }).then((sensing) => {
            this.times = sensing.times;
            return this.writeVisitActions(sensing.values);
        }).then(() => {
            return this.writeMoveActions();
        }).then(() => {
            return this.finalizeDomain();
        }).then(() => {
            return this.computePlan(this.computeAttractions, this.city, this.times);
        }).then((result) => {
            logger.debug('result array', JSON.stringify(result));
            res.send(result);
        }).catch((err) => {
            logger.error(err);
            res.status(500).send(err);
        });
    }

    public getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radius of the earth in km
        const dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
        const dLon = this.deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance in km
        return d;
    }

    public deg2rad(deg) {
        return deg * (Math.PI / 180);
    }

}

interface ICityAttraction {
    id: number;
    latitude: number;
    longitude: number;
    radius: number;
    city_id?: number;
}

export class MuseumPlanning {
    private problemFile: string;
    private domainFile: string;

    private museumData;
    private rooms: IRoom[];
    private attractions: IMuseumAttraction[];
    private computeAttractions: IMuseumAttraction[];

    private adjacencies: object;
    private attr2room = {};
    private times: {};
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
        this.problemFile = config.get('problemsFolder') + 'museum/' + this.museum + '_problem' + '.pddl';
        this.domainFile = config.get('problemsFolder') + 'museum/' + this.museum + '_domain' + '.pddl';
    }

    public requestAttractions(): rp.RequestPromise {
        return rp.get({
            json: true,
            uri: dbServer + 'museums/' + this.id,
        });
    }

    public filterAttractions(museum): object {
        logger.info(museum);
        this.museumData = museum;
        museum.rooms.forEach((r) => {
            logger.debug(r);
            if (r.starting) {
                this.museumData.start = r.id;
            }
        });
        museum.rooms.forEach((rm) => {
            this.rooms.push(rm);
            this.computeAttractions = this.computeAttractions.concat(rm.attraction_ms.filter((attraction) => {
                if (this.exclude.indexOf(attraction.id) === -1) {
                    this.attr2room[attraction.id] = rm;
                    return true;
                }
                return false;
            }));
        });
        return museum;
    }

    public writeProblemFile() {
        let problemData: string;
        problemData = '(define (problem Visit) (:domain Museum)\n\t(:objects\n\t\t';

        this.rooms.forEach((rm) => {
            problemData += 'top_' + rm.id + ' ';
        });
        problemData += '- topology_state\n\t\t';

        for (let i = 0; i <= this.visits; i++) {
            problemData += 'v' + i + ' ';
        }
        problemData += '- visit_state\n\t\t';

        this.computeAttractions.forEach((attraction) => {
            problemData += 'att_' + attraction.id + ' ';
        });
        problemData += '- attraction\n\t)\n\t';

        problemData += '(:init\n\t\t(cur_state top_' + this.museumData.start + ')\n\t\t(cur_state v0)\n\n\t\t(= (total-cost) 0)\n\t)\n\n\t';
        problemData += '(:goal\n\t\t(and\n\t\t\t(cur_state v' + this.visits + ')\n\t\t\t';

        this.must.forEach((attractionId) => {
            problemData += '(visited att_' + attractionId + ')\n\t\t';
        });

        problemData += '\n\t\t)\n\t)\n\t(:metric minimize (total-cost))\n)';
        return new Promise((resolve, reject) => {
            fs.writeFile(this.problemFile, problemData, 'utf8', (err) => {
                if (err) reject(err);
                logger.info('Problem file has been written');
                resolve();
            });
        });
    }

    public writeDomainHeader() {
        const domainHeader = '(define (domain Museum)\n\t(:requirements :typing :equality)\n\t(:types topology_state visit_state - state attraction)\n\t' +
            '(:predicates\n\t\t(cur_state ?s - state)\n\t\t(visited ?a - attraction)\n\t)\n\t(:functions\n\t\t(total-cost)\n\t)\n\t';
        return new Promise((resolve, reject) => {
            fs.writeFile(this.domainFile, domainHeader, 'utf8', (err) => {
                if (err) reject(err);
                else resolve(domainHeader);
            });
        });
    }

    public writeVisitActions(sensingData) {
        let action = '';
        let cost = 0;
        if (sensingData.length === 0) {
            cost = 10;
            this.computeAttractions.forEach((attraction) => {
                const id = attraction.id;
                for (let j = 0; j < this.visits; j++) {
                    action += '(:action visit-v' + j + '-' + id + '\n\t\t';
                    action += ':precondition (and (cur_state top_' + this.attr2room[id].id + ') (cur_state v' + j + ') (not (visited att_' + id + ')))\n\t\t';
                    action += ':effect (and (cur_state v' + (j + 1) + ') (not (cur_state v' + j + ')) (visited att_' + id + ') (increase (total-cost) ' + cost + '))\n\t)\n\t';
                }
            });
            return new Promise((resolve, reject) => {
                fs.appendFile(this.domainFile, action, 'utf-8', (err) => {
                    if (err) reject(err);
                    else resolve(action);
                });
            });

        } else {
            Object.keys(sensingData).forEach((id) => {
                cost = sensingData[id];
                for (let j = 0; j < this.visits; j++) {
                    action += '(:action visit-v' + j + '-' + id + '\n\t\t';
                    action += ':precondition (and (cur_state top_' + this.attr2room[id].id + ') (cur_state v' + j + ') (not (visited att_' + id + ')))\n\t\t';
                    action += ':effect (and (cur_state v' + (j + 1) + ') (not (cur_state v' + j + ')) (visited att_' + id + ') (increase (total-cost) ' + cost + '))\n\t)\n\t';
                }
            });
            return new Promise((resolve, reject) => {
                fs.appendFile(this.domainFile, action, 'utf-8', (err) => {
                    if (err) reject(err);
                    else resolve(action);
                });
            });
        }
    }

    public writeMoveActions() {
        const minutes = 1;
        let move = '';
        this.museumData.rooms.forEach((s) => {
            s.adjacent.forEach((t) => {
                s = 'top_' + s.id;
                t = 'top_' + t.id;
                move += '(:action move-' + s + '-' + t + '\n\t\t';
                move += ':precondition (cur_state ' + s + ')\n\t\t';
                move += ':effect (and (cur_state ' + t + ') (not(cur_state ' + s + ')) ';
                move += '(increase (total-cost) ' + minutes + '))\n\t)\n\t';
            });
        });
        /*Object.keys(this.museumData.adjacencies).forEach((s) => {
            this.museumData.adjacencies[s].forEach((t) => {
                s = 'top_' + s;
                t = 'top_' + t;
                move += '(:action move-' + s + '-' + t + '\n\t\t';
                move += ':precondition (cur_state ' + s + ')\n\t\t';
                move += ':effect (and (cur_state ' + t + ') (not(cur_state ' + s + ')) ';
                move += '(increase (total-cost) ' + minutes + '))\n\t)\n\t';
            });
        });*/
        return new Promise((resolve, reject) => {
            fs.appendFile(this.domainFile, move, 'utf8', (err) => {
                if (err) reject(err);
                else resolve(move);
            });
        });
    }

    public finalizeDomain() {
        return new Promise((resolve, reject) => {
            fs.appendFile(this.domainFile, '\n)', 'utf8', (err) => {
                if (err) reject(err);
                else resolve('\n)');
            });
        });
    }

    public computePlan(attractions, attr2room, museum, times) {
        shelljs.cd(config.get('plannersFolder') + 'downward');
        logger.info('domain file:', this.domainFile);
        logger.info('problem file:', this.problemFile);
        const solFileName = this.museum.toLowerCase().replace(/\s/g, '_');
        logger.info(solFileName);
        const solutionOutput = config.get('plannersFolder') + 'solution/' + solFileName + '.sol';
        const ff = ' --heuristic "hff=ff()" --search "lazy_greedy([hff], preferred=[hff])"';
        const astar = ' --search "astar(blind())"';
        let execString = './fast-downward.py --build release64 ';
        execString += this.domainFile + ' ' + this.problemFile + astar;
        execString += ' > ' + solutionOutput;
        logger.info('exec string:', execString);
        // shelljs.exec(exec_string, {silent:true}, function(status, output) {
        return new Promise((resolve, reject) => {
            shelljs.exec(execString, (status, output) => {
                if (status !== 0) {
                    reject('errore nel planner');
                }
                const lr = new LineByLineReader(solutionOutput);
                lr.on('error', (err) => {
                    logger.error(" 'err' contains error object x");
                    reject(" 'err' contains error object x");
                });

                const visits = [];
                lr.on('line', (line) => {
                    if (line.includes('visit-v')) {
                        visits.push(line.split('-')[2].split(' ')[0]);
                    }
                });
                const outputList = [];
                lr.on('end', function() {
                    const outputObject = {
                        id: this.id,
                        name: museum,
                        route: outputList,
                        type: 'museum',
                    };
                    for (const visit of visits) {
                        let attraction;
                        attractions.forEach((attr) => {
                            if (attr.id === visit) {
                                attraction = attr;
                            }
                        });
                        attraction.picture = 'https://neptis-poleis.diag.uniroma1.it:9070/public/img/' + attraction.picture;
                        logger.debug(attr2room);
                        const obj = {
                            description: attraction.description,
                            id: attraction.id,
                            name: attraction.name,
                            picture: attraction.picture,
                            rating: attraction.rating,
                            room: attr2room[attraction.id].name,
                            time: times[attraction.id],
                        };
                        outputList.push(obj);
                    }
                    // All lines are read, file is closed now.
                    let totalTime = 0;
                    outputList.forEach((item) => {
                        totalTime += item.time;
                    });
                    logger.info('End');
                    logger.info('ready: ' + JSON.stringify(outputObject));

                    shelljs.exec('rm ' + solutionOutput, (s, o) => {
                        if (s) {
                            logger.info('error during delete solution file');
                        } else logger.info('file solution deleted successfully');
                    });
                    resolve(outputObject);
                });
            }); // fine exec*/
        });

    }

    public exec(res): void {
        this.requestAttractions().then((body) => {
            this.museum = body.name;
            return this.filterAttractions(body);
        }).then(() => {
            logger.debug(this.museumData);
            return this.writeProblemFile();
        }).then(() => {
            return this.writeDomainHeader();
        }).then((header) => {
            const urlSensing = dbServer + 'sensing/museum/' + this.id;
            return rp.get({ uri: urlSensing, json: true });
        }).then((sensing) => {
            this.times = sensing.times;
            logger.debug(this.times);
            return this.writeVisitActions(sensing.values);
        }).then(() => {
            return this.writeMoveActions();
        }).then(() => {
            return this.finalizeDomain();
        }).then(() => {
            return this.computePlan(this.computeAttractions, this.attr2room, this.museum, this.times);
        }).then((result) => {
            res.send(result);
        }).catch((err) => {
            logger.error(err);
            res.status(500).send(err);
        });
    }
}

interface IRoom {
    id: number;
    attractions: IMuseumAttraction[];
}

interface IMuseumAttraction {
    id: number;
    city_id?: number;
}
