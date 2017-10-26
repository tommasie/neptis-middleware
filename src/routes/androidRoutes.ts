import * as express                     from 'express';
import * as rp                          from 'request-promise';
import jwt = require('jsonwebtoken');
import {logger}                         from '../config/logger';
import {CityPlanning, MuseumPlanning}    from '../planning';
import * as async from 'async';
const neo4j = require('neo4j-driver').v1;

let serverName = "http://localhost:3200/";
let curator_id = 1;

const androidRouter = express.Router();

androidRouter.use((req,res,next) => {
    //TODO
    next();
});

androidRouter.route('/attractionc')
.get((req,res) => {
    let city = req.query.city;
    let region = req.query.region;
    rp.get({
        uri: serverName + "attractionc/city/?city=" + city + "&region=" + region,
    })
    .then(attractions => {
        res.status(200).send(attractions);
    })
    .catch(err => {
        res.send(500);
    })
});

androidRouter.route('/museums')
.get((req,res) => {
    let city = req.query.city;
    let region = req.query.region;
    rp.get({
        uri: serverName + "museums/city/?city=" + city + "&region=" + region,
    })
    .then(museums => {
        res.status(200).send(museums);
    })
    .catch((err) => {
        res.send(500);
    })
});

androidRouter.route('/museums/attractions/:id')
.get((req,res) => {
    let id = req.params.id;
    rp.get({
        uri: serverName + "museums/attractions/" + id
    })
    .then(attractions => {
        res.status(200).send(attractions);
    })
    .catch((err) => {
        res.send(500);
    })
});

androidRouter.route('/compute-plan-city')
.post((req,res) => {
    let cp = new CityPlanning(
        req.body.city,
        req.body.region,
        req.body.visits,
        req.body.must,
        req.body.exclude,
        req.body.lat,
        req.body.lng
    );
    cp.exec(res);
});

androidRouter.route('/compute-plan-museum')
.post((req,res) => {
    let cp = new MuseumPlanning(
        req.body.museum,
        req.body.id,
        req.body.visits,
        req.body.must,
        req.body.exclude,
    );
    let result = cp.exec(res);
    console.log(result);
    res.status(200).send(result);
});

androidRouter.route('/neo4j-post')
.post((req,res) => {
    const driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'emaldyst'));
    const session = driver.session();
    let museumId = neo4j.int(1);
    let museumName = "name";
    let name2id = {};
    let adjList = {};
    let input = {"A":["B"],"B":["C"],"C":[]};
    let start = "A";
    logger.debug(start);
    let end = "C";
    /*rp.get({
        uri: serverName + "rooms/" + museumId
    }).then(rooms => {*/
        //
        let rooms = [
            {id:1, name:"A"},
            {id:2, name:"B"},
            {id:3, name:"C"}
        ]
        rooms.forEach(room => {
            name2id[room.name] = neo4j.int(room.id);
            adjList[room.id] = [];
        });
        start = name2id[start];
        end = name2id[end];

        Object.keys(input).forEach(key => {
            let keyId = name2id[key];
            for(let room of input[key]) {
                adjList[keyId].push(name2id[room]);
            }
        });

        let create = "CREATE ";
        rooms.forEach(room => {
            create += "(:Room {id:" + neo4j.int(room.id) + ", museum:" + museumId + "}), ";
        });
        create += "(:Museum {id:" + museumId +"})";
        logger.debug(create);
        session.run(create)
        .then(result => {
            let rels = [];
            Object.keys(adjList).forEach(s => {
                adjList[s].forEach(t => {
                    let rel = "MATCH (a:Room), (b:Room) WHERE a.id =" + s + " AND b.id =" + t + " CREATE (a)-[:NEXT]->(b)";
                    rels.push(rel);
                });
            });
            async.each(rels, (rel, cb) => {
                session.run(rel)
                .then(result => {
                    cb();
                }).catch(err => {
                    cb(err);
                });
            }, err => {
                if(err) throw err;
                let q = "MATCH (a:Museum), (b:Room) WHERE a.id ="+museumId+" AND b.id ="+start+" CREATE (a)-[:START]->(b)";
                session.run(q)
                .then(result => {
                    let q = "MATCH (a:Museum), (b:Room) WHERE a.id ="+museumId+" AND b.id ="+end+" CREATE (a)<-[:END]-(b)";
                    session.run(q)
                    .then(result => {
                        session.close();
                        driver.close();
                        res.sendStatus(201);
                    }).catch(err => {
                        logger.error(err);
                        session.close();
                        driver.close();
                        res.sendStatus(500);
                    });
                }).catch(err => {
                    logger.error(err);
                    session.close();
                    driver.close();
                    res.sendStatus(500);
                });
            })

        }).catch(err => {
            logger.error(err);
            session.close();
            driver.close();
            res.sendStatus(500);
        });
    /*}).catch(err => {
        res.sendStatus(500);
    });*/

});

androidRouter.route('/neo4j-post')
.get((req,res) => {
    const driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'emaldyst'));
    const session = driver.session();
    let museumId = neo4j.int(1);
    let adjList = {}
    session.run("MATCH (a)-[:NEXT]->(b) WHERE a.museum =" + museumId +" RETURN a,b")
    .then(links => {
        links.records.forEach(record => {
            let id1 = record.get('a').properties.id.low;
            let id2 = record.get('b').properties.id.low;
            if(adjList[id1] == undefined) {
                adjList[id1] = [];
            }
            adjList[id1].push(id2);
            session.run("MATCH (n)-[:START]->(a), (n)<-[:END]-(b) WHERE n.id =" + museumId +" RETURN a,b")
            .then(dummies => {
                adjList['start'] = dummies.records[0].get('a').properties.id.low;
                adjList['end'] = dummies.records[0].get('b').properties.id.low;
                res.send(adjList);
            }).catch(err => {
                throw err;
            });
        });
    }).catch(err => {

    });

});

export {androidRouter};
