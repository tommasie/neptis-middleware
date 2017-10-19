var request = require('request');
var app = require(__dirname + '/curatore');
var config = require(__dirname + '/public/resources/config.json');
var serverName = config.serverName;
var portNumber = config.portNumber;
var serverUrl = config.serverUrl;
var serverNode = config.serverNode;

require('shelljs/global');
var guardia2 = true;

/**
User login
**/
app.post('/login_user', function(req, res) {
    console.log("[/login_user] POST login attempt: %s", req.body.mail);
    var umail = req.body.mail;
    var upwd = req.body.password;
    sess = req.session;
    sess.name = umail;
    res.setHeader('Content-Type', 'application/json');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);


    //2)web server makes a get to glassfish 
    //3)Check and responde back to Android App 
    request({
        url: "http://localhost:8080/RestNeptis/webresources/entities.users/" + umail,
        method: "GET",
        json: true, // <--Very important!!!
        headers: [{
            'content-type': 'application/json'
        }]
    }, function(error, response, body) {
        if (error) {
            console.log("[/login_user] ERROR in login phase. The server may be down");
            res.status(500).end();
            res.send({
                error: 1
            });
            return;
        }
        console.log("[/login_user] request statusCode: %s", response.statusCode);
        console.log(body);
        if (!error & response.statusCode === 200) {
            if (umail === body.email) {
                if (upwd === body.password) {
                    console.log("[/login_user] authentication was successful, user %s", umail);
                    res.send({
                        response: 'ok',
                        user: body.name
                    })
                    return;
                } else {
                    res.status(204).end();
                    res.send({
                        error: 1
                    });
                    console.log("[/login_user] incorrect password, user: %s", umail);
                    return;
                }
            } else {
                console.log("[/login_user] authenticatin failed! user: %s", umail);
                res.status(500).end();
                return;
            }
        } else if (!error & response.statusCode === 204) {
            console.log("[/login_user] user not found: %s", umail);
            res.status(204).end();
            return;

        } else if (!error & response.statusCode === 500) {
            console.log("[/login_user] HTTP code 500: Internal Server Error");
            res.status(500).end();
            return;
        }
    });
});

/**
Register new user
**/
app.post('/user_registration', function(req, res) {
    console.log("[/user_registration] POST registration request: %s", req.body.mail);
    var uname = req.body.name;
    var username = req.body.surname;
    var umail = req.body.mail;
    var upwd = req.body.password;
    res.setHeader('Content-Type', 'application/json');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);

    //2)web server makes a post to glassfish 

    request({
        url: "http://localhost:8080/RestNeptis/webresources/entities.users",
        method: "POST",
        json: {
            name: uname,
            surname: username,
            email: umail,
            password: upwd
        },
    }, function(error, response, body) {
        console.log("Request statusCode: " + response.statusCode);
        if (!error & response.statusCode === 204) {
            console.log("[/user_registration] successful registration, user: %s", umail);
            res.status(response.statusCode);
            res.send({
                response: 'ok'
            })
            return;
        } else {
            res.status(response.statusCode);
            res.send({
                error: 1
            });
            console.log("[/user_registration] failed registration, user: %s " + umail);
            return;
        }
    });
});

app.get('/get_city_Android', function(req, res) {
    console.log("*** POST '/get_city'");
    res.setHeader('Content-Type', 'application/xml');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);

    request({
        url: "http://localhost:8080/RestNeptis/webresources/entities.city",
        method: "GET",
        headers: [{
            'content-type': 'application/xml'
        }]

    }, function(error, response, body) {

        console.log("Request statusCode: " + response.statusCode);
        if (!error & response.statusCode === 200) {

            //console.log(body);
            res.status(response.statusCode);
            //res.send({ response : 'ok'})
            res.send(body);
            console.log("/get_city riuscita ");
            return;
        } else {
            res.status(response.statusCode);
            //res.send({error : 'reg_error'});
            res.send(body);
            console.log("/get_city fallita! ");
            return;
        }
    });
});

//1) *** Android App makes a post to web server ***
//** REQUESTED: 'Name' of the city to get attractionC
app.post('/get_attraction', function(req, res) {
    console.log("[/get_attraction] POST category: %s", req.body.category);
    var category = req.body.category;
    var id = req.body.id; // è l'id della città o del museo o dell oam
    res.setHeader('Content-Type', 'application/json');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);

    var uurl = "http://localhost:8080/RestNeptis/webresources/";
    if (category === "City")
        uurl += "entities.attractionc/cityId=" + id;
    else if (category === "Museum")
        uurl += "entities.attractionm/museumId=" + id;
    else if (category === "Opened Air Museum")
        uurl += "entities.attractionoam/oamId=" + id;

    else return console.log("[/get_attraction] category error on GlassFish");

    //2)web server makes a post to glassfish 

    request({
        url: uurl,
        method: "GET",
        json: true,
        headers: [{
            'content-type': 'application/json'
        }]
    }, function(error, response, body) {
        console.log("[/get_attraction] request statusCode: " + response.statusCode);
        if (!error & response.statusCode === 200) {
            console.log("[/get_attraction] OK");
            res.status(response.statusCode);
            res.send(body);
            return;
        } else {
            res.status(response.statusCode);
            res.send("error /get_attraction");
            console.log("[/get_attraction] failed!");
            return;
        }
    });

});

// call to compute plan
//*** REQUIRED ***: Json Object with user preferences (type, name (of the problem), availabletime, must, exclued) 
/*Steps:
1)Take problem name.pddl ('/create-pddl')
2) add preferences (tcoda, starting point, metric and goal) to the file
3) call pddl script passing domain.pddl and problem.pddl FILE
4) wait for the result and return it back to the client;

*/
//1 per city, 1 per museo, 1 per oam
app.post('/compute-plan-city', function(req, res) {
    console.log("[/compute-plan-city] req.body: \n", req.body);
    var estimateTime = 0;
    var rating = req.body.rating;
    var umail = req.body.mail;
    var ucategory = req.body.category; // {city, museum, oam}
    var uname = req.body.type; // for example {Rome}
    uname = uname.toLowerCase();
    var uid = req.body.id; //1 = roma 
    var hh = req.body.hh; //available time (hours)
    var mm = req.body.mm; //available time (minutes)
    var must = req.body.must; //must
    var exclude = req.body.exclude; //exclude

    var lat = req.body.lat;
    var lon = req.body.lon;
    var dd = req.body.data;
    var travel_mode = req.body.travel_mode;
    var data_mode = req.body.data_mode;

    var tr_mode;
    if (travel_mode === "Walking")
        tr_mode = "walking";
    else if (travel_mode === "Driving")
        tr_mode = "driving";
    else if (travel_mode === "Public Transport")
        tr_mode = "transit";

    var n = 1; // è il numero di step minimo che deve fare il planner
    var maxtime = ((hh * 60) + (mm * 1));

    var fileProblem = "/home/thomas/tesi/problems/" + ucategory + "/" + uname + ".pddl";
    var fileToWrite = "/home/thomas/tesi/problems/" + ucategory + "/" + uname + "-" + umail + ".pddl";

    /*
    // - - - esempio.. (da togliere)
    var umail = "rob@mail.com";
    var ucategory = "city"; // {city, museum, oam}
    var uname = "roma"; // for example {Rome}
    var uid = 1; // req.body.id;  //1 = roma 
    var hh = 10; //available time
    var mm = 20;
    var must = "colosseo"; //must
    var exclude = "trevi"; //exclude

    var n = 2; // è il numero di step minimo che deve fare il planner

    var fileProblem = "/Users/roberto/Desktop/problems/"+ucategory+"/"+uname+".pddl";
    var fileToWrite = "/Users/roberto/Desktop/problems/"+ucategory+"/"+uname+"-user.pddl";
    // - - - 
    */

    console.log("[/compute-plan-city] POST, user: %s", umail);
    res.setHeader('Content-Type', 'application/json');

    // Start WRITE FILEs operations ** THESE OPERATIONS MUST BE SEQUENTIAL 
    var fs = require('fs');

    /* ANDROID APP PART*/
    // ASYNC with nested callbacks
    //COPIO IL FILE per aggiungere le preferenze dell utente
    fs.readFile(fileProblem, (err, data) => {
        if (err) throw err;
        fs.writeFile(fileToWrite, data, function(err) {
            if (err) throw err;

            /** SENSING PART **/

            // -- T CODA
            var urlCoda = "http://localhost:8080/RestNeptis/webresources/entities.sensing/tcoda/" + ucategory + "Id=" + uid;
            request({
                url: urlCoda,
                method: "GET",
                json: true, // <--Very important!!!
                headers: [{
                        'content-type': 'application/json'
                    }] // change to Json
            }, function(error, response, body) {
                if (error) {
                    console.log(error);
                    return;
                }
                console.log("[/compute-plan-city] TCODA request statusCode: " + response.statusCode);
                if (!error & response.statusCode === 200) {

                    /** CODE TO CREATE PROBLEM FILE **/
                    //scrittura su file

                    //(= (tcoda colosseo) 10)

                    var tcoda = "";
                    var name_temp = "";

                    console.log("[/compute-plan-city] TCODA body.sensing:\n\n", body);
                    var len = body.length;
                    if (len > 1) {
                        name_temp = body[0].tcoda.attractionC.name;
                        for (var i = 0; i < body.length; i++) {
                            //NB: in this way we consider only the most recent value
                            if (name_temp != body[i].tcoda.attractionC.name) {
                                tcoda += "(=(tcoda " + body[i - 1].tcoda.attractionC.name.toLowerCase().replace(/ /g, "_") + " ) " + body[i - 1].tcoda.minutes + ")\n";
                                name_temp = body[i].tcoda.attractionC.name;
                            }
                            if (i == (len - 1)) {
                                tcoda += "(=(tcoda " + body[i].tcoda.attractionC.name.toLowerCase().replace(/ /g, "_") + " ) " + body[i].tcoda.minutes + ")\n";
                                name_temp = "";
                            }
                        }
                    } else {
                        console.log("[/compute-plan-city] WARNING: sensing part of tcoda is empty!");
                        res.status(500).end();
                        return;
                    }

                    var fs = require('fs');
                    fs.appendFile(fileToWrite, tcoda, function(err) {
                        if (err) {
                            console.log(err);
                            res.status(500).end();
                            return;
                        }
                        console.log("\n[/compute-plan-city] The sensing part for tcoda was added!\n");
                    });

                    //-- TVISITA
                    var urlVisita = "http://localhost:8080/RestNeptis/webresources/entities.sensing/tvisita/" + ucategory + "Id=" + uid;

                    request({
                        url: urlVisita,
                        method: "GET",
                        json: true, // <--Very important!!!
                        headers: [{
                                'content-type': 'application/json'
                            }] // change to Json
                    }, function(error, response, body) {
                        console.log("[/compute-plan-city] TVISITA request statusCode: " + response.statusCode);
                        if (!error & response.statusCode === 200) {
                            /** CODE TO CREATE PROBLEM FILE **/
                            //scrittura su file

                            //(= (tvisita colosseo) 10)
                            console.log("[/compute-plan-city] TVISITA body.sensing:\n\n", body);
                            var tvisita = "";

                            if (body.length > 1) {
                                // se sensing ha 1 o 0 tuple ---> problema sulla length
                                for (var i = 0; i < body.length; i++)
                                    tvisita += "(=(tvisita " + body[i].tvisita.attractionC.name.toLowerCase().replace(/ /g, "_") + " ) " + body[i].tvisita.minutes + ")\n";
                            } else {
                                console.log("[/compute-plan-city] WARNING: sensing part of tvisita is empty!");
                                res.status(500).end();
                                return;
                            }

                            var fs = require('fs');
                            fs.appendFile(fileToWrite, tvisita, function(err) {
                                if (err) {
                                    return console.log(err);
                                }
                                console.log("\n[/compute-plan-city] the sensing part for visita was added!\n");
                            });

                            google_distance(fileToWrite, ucategory, uid, dd, lat, lon, uname, umail, tr_mode);

                        } else { // no 200 tmove
                            res.status(500).end();
                            console.log("[/compute-plan-city] tvisita: Internal server error");
                            return;
                        }
                    }); // fine request tvisita

                } else { //fine 200 TCODA
                    res.status(500).end();
                    console.log("tcoda: Internal server error");
                    return;
                }

            }); //fine request tCoda

        }); //fine write
    }); //fine read

    function google_distance(fileToWrite, category, cityId, dd, lat, long, name, umail, tr_mode) {
        //var apiKey=' AIzaSyAkC3xqAv3Q8ZXfuCXsbTWDMxlKNlzRfVg ';
        var apiKey = ' AIzaSyD0xbJJwC7pQBzNFupb2s7orzOvB_ctSb4 ';
        console.log("[google_distance] city name: %s", name);
        if (category === 'city') {
            request({
                url: "http://localhost:8080/RestNeptis/webresources/entities.attractionc/cityId=" + cityId,
                method: "GET",
                json: true,
                headers: [{
                    'content-type': 'application/json'
                }]
            }, function(error, response, body) {
                console.log("[google_distance] request statusCode get attraction: %s", response.statusCode);
                if (!error & response.statusCode === 200) {
                    console.log("[google_distance]  response for attractionC of city with id %d: %s", cityId, body.length);

                    for (var i = 0; i < body.length; i++) {
                        destination = body[i].name;
                        latDest = body[i].latitude;
                        longDest = body[i].longitude;
                        console.log("[google_distance] destination prova 1 for:", destination);
                        GoogleApiCall(lat, long, destination, latDest, longDest, name, umail); //calcola tempo da posizione di partenza a tutte attraz
                        //GoogleApiCall(lat,long,destination,name,umail); //calcola tempo da posizione di partenza a tutte attraz
                        for (var j = i; j < body.length - 1; j++) {
                            if (i === body.length - 1)
                                return;
                            sorg = body[i].name;
                            sorgLat = body[i].latitude
                            sorgLong = body[i].longitude
                            dest = body[j + 1].name;
                            destLat = body[j + 1].latitude;
                            destLong = body[j + 1].longitude;
                            sorgId = body[i].id;
                            destId = body[j + 1].id;

                            console.log("[google_distance] sorgente ", sorg);
                            console.log("[google_distance] destinazione", dest);
                            calculate_distance(sorgId, destId, sorgLat, sorgLong, destLat, destLong);
                        }
                    }
                    return;
                } else {
                    //res.status(response.statusCode);
                    //res.send({error : 'reg_error'});
                    //res.send(body);
                    console.log("[google_distance] ERROR in /get_attraction");
                    return;
                }
            });
            //Calculate distance: determine the distance in time between two attractions
            function calculate_distance(sorgId, destId, sorgLat, sorgLong, destLat, destLong) {
                //var apiKey=' AIzaSyAkC3xqAv3Q8ZXfuCXsbTWDMxlKNlzRfVg ';
                var apiKey = ' AIzaSyD0xbJJwC7pQBzNFupb2s7orzOvB_ctSb4 ';
                request({
                    url: "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + sorgLat + "," + sorgLong + "&destinations=" + destLat + "," + destLong + "&language=it-IT&mode=" + tr_mode + "&key=" + apiKey,
                    method: "POST",
                    json: true,
                    headers: [{
                        'content-type': 'application/json'
                    }]
                }, function(error, response, body) {
                    console.log("[calculate distance] Google API response statusCode: " + response.statusCode);
                    if (!error & response.statusCode === 200) {
                        console.log("[calculate distance] Google API response :\n", body);
                        //check status response from google API
                        if (body.rows[0].elements[0].status === 'OK') {
                            var time = body.rows[0].elements[0].duration.text;
                            var timeParsed = time.split(" ");
                            console.log("[calculate distance] prova split ", timeParsed);
                            if (time.search("ore") === -1 && time.search("ora") === -1 && time.search("giorno") === -1 && time.search("giorni") === -1) { //no ore,solo minuti                  
                                minutes = timeParsed[0];
                                console.log("[calculate_distance] addTmoveArCity(%d,%d,%d) if 1", sorgId, destId, minutes);
                                addTmoveAtCity(sorgId, destId, minutes, dd); // function that performs the above steps
                            } else if (time.search("minutes") === -1 && time.search("giorno") === -1 && time.search("giorni") === -1) { // solo ore
                                //insert in tmove timeParsed[0] che conterrà valore ore da convertire in minutes
                                minutes = timeParsed[0] * 60;
                                console.log("[calculate_distance] addTmoveArCity(%d,%d,%d) if 2", sorgId, destId, minutes);
                                addTmoveAtCity(sorgId, destId, minutes, dd);
                            } else if ((time.search("ora") === 1 || time.search("ore") === 1) && (time.search("minutes") === 1)) { //sia ore che minuti
                                //insert timeParsed[0]+timeParsed[1] dopo aver convertito ore in minutes
                                hourToMin = timeParsed[0] * 60;
                                minutes = timeParsed[2];
                                minutes = +minutes;
                                hourToMin = +hourToMin;
                                minutes = hourToMin + minutes;
                                console.log("[calculate_distance] addTmoveArCity(%d,%d,%d) if 3", sorgId, destId, minutes);
                                addTmoveAtCity(sorgId, destId, minutes, dd);
                            }
                            console.log("[calculate distance] TEMPO SPOSTAMENTO ", time);
                            //res.send({ error : '0'});
                            return;
                        } else console.log("[calculate distance] Something goes wrong with google response");
                    } else {
                        //res.status(response.statusCode);
                        //res.send({error : 'reg_error'});
                        //res.send(body);
                        console.log("[calculate distance] google API failed!: ");
                        return;
                    }
                });
            }

            //GoogleApiCall: determine the distance in time between the user (via his GPS coordinates) and an attraction
            function GoogleApiCall(lat, long, dest, latDest, longDest, name, umail) {
                var apiKey = ' AIzaSyD0xbJJwC7pQBzNFupb2s7orzOvB_ctSb4 ';
                // var apiKey = ' AIzaSyAkC3xqAv3Q8ZXfuCXsbTWDMxlKNlzRfVg ';               

                request({
                    url: "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + lat + "," + long + "&destinations=" + latDest + "," + longDest + "&language=it-IT&mode=" + tr_mode + "&key=" + apiKey,
                    //modify url so that destination is a proper (lat,long) tuplelongDest+
                    method: "POST",
                    json: true,
                    headers: [{
                        'content-type': 'application/json'
                    }]
                }, function(error, response, body) {
                    //console.log("Request statusCode google api call: "+response.statusCode);
                    if (!error & response.statusCode === 200) {
                        console.log("[GoogleApiCall] response: \n", body);
                        if (body.rows[0].elements[0].status === 'OK') {
                            var time = body.rows[0].elements[0].duration.text;
                            var timeParsed = time.split(" ");
                            console.log("[GoogleApiCall] time: ", time);
                            console.log("[GoogleApiCall] time split: ", timeParsed);
                            if (time.search("ora") === -1 && time.search("ore") === -1) { //ho solo minuti
                                minutes = timeParsed[0];
                                console.log("[GoogleApiCall] minutes from start: ", minutes);
                                writeOnProblem(dest, minutes, name, umail); //chiamata funzione che scrive su pddl
                            } else if (time.search("minutes") === -1) { //non ho minuti,ho ore e converto in minutes
                                minutes = timeParsed[0] * 60;
                                writeOnProblem(dest, minutes, name, umail);
                            }
                            //if(time.search("ore") !== -1 & time.search("minutes") !== -1)
                            else {
                                hourToMin = timeParsed[0] * 60;
                                minutes = timeParsed[2];
                                minutes = +minutes;
                                hourToMin = +hourToMin;
                                minutes = hourToMin + minutes;

                                console.log("[GoogleApiCall] hrs and mins from start: ", minutes);
                                writeOnProblem(dest, minutes, name, umail);
                            }
                        }
                    }
                });
            }

            function writeOnProblem(dest, minutes, name, umail) {
                uname = name.toLowerCase().replace(/ /g, "_");
                udest = dest.toLowerCase().replace(/ /g, "_");
                fileProblem = "/home/thomas/tesi/problems/city/" + uname + "-" + umail + ".pddl";
                var fs = require('fs');
                fs.appendFile(fileProblem,
                    "(=(tmoveAA start " + udest + ") " + minutes + ")\n",
                    'utf8',
                    function(err) {
                        if (err) {
                            return console.log(err);
                        }
                        console.log("[writeOnProblem] The problem file: ", uname + ".pddl was updated with distance from start to " + dest);
                    });
            }

            function addTmoveAtCity(sorgId, destId, minutes, dd) {
                request({
                    url: "http://localhost:8080/RestNeptis/webresources/entities.tmoveat/" + sorgId + "," + destId + "," + minutes,
                    method: "GET",
                    json: true,
                    headers: [{
                        'content-type': 'application/json'
                    }]
                }, function(error, response, body) {
                    console.log("[addTmoveAtCity] tmoveat request statusCode: %s", response.statusCode);
                    //console.log("*** response ", response);
                    if (!error & response.statusCode === 200) {
                        console.log("[addTmoveAtCity] sorg: %d; dest: %d", sorgId, destId);
                        console.log("[addTmoveAtCity] get tmove-attraction from minutes and attraction succeded");
                        if (body.length > 0) {
                            //there exists a visit time for that attraction with those minutes so we have to add only in sensing table
                            tmoveatId = body[0].id;
                            request({
                                url: "http://localhost:8080/RestNeptis/webresources/entities.sensing/",
                                method: "POST",
                                json: {
                                    data: dd,
                                    tmoveat: {
                                        id: tmoveatId
                                    }
                                },
                                headers: [{
                                    'content-type': 'application/json'
                                }]
                            }, function(error, response, body) {
                                console.log("[addTmoveAtCity] sensing POST request statusCode: " + response.statusCode);
                                //console.log("*** response ", response);
                                if (!error & response.statusCode === 204) {
                                    console.log("[addTmoveAtCity] POST in sensing table succeded");
                                    //response.status(response.statusCode);
                                    //res.send({ response : 'ok'})

                                    // -- TMOVEAT 
                                    if (guardia2) {
                                        console.log("guardia2: ", guardia2);
                                        guardia2 = false;
                                        var urlMoveAT = "http://localhost:8080/RestNeptis/webresources/entities.sensing/tmoveAT/city/cityId=" + cityId;
                                        request({
                                            url: urlMoveAT,
                                            method: "GET",
                                            json: true, // <--Very important!!!
                                            headers: [{
                                                    'content-type': 'application/json'
                                                }] // change to Json
                                        }, function(error, response, body) {
                                            console.log("[addTmoveAtCity] TMOVEAT sensing request statusCode: %s", response.statusCode);
                                            if (!error & response.statusCode === 200) {
                                                console.log("[TMOVEAT] body: \n", body);
                                                /** CODE TO CREATE PROBLEM FILE **/
                                                //scrittura su file

                                                //(= (tmoveAt colosseo sanpietro) 4)

                                                // da fare .. (= (tmoveAt sanpietro colosseo) 4)
                                                var tmoveAT = "";

                                                //console.log("body.length: ",body.length);

                                                if (body.length >= 1) {
                                                    var guardia = false;

                                                    // se sensing ha 1 o 0 tuple ---> problema sulla length
                                                    for (var i = 0; i < body.length; i++) {
                                                        tmoveAT += "(=(tmoveAt " + body[i].tmoveat.attractionC1.name.toLowerCase().replace(/ /g, "_") + " " + body[i].tmoveat.attractionC2.name.toLowerCase().replace(/ /g, "_") + " ) " + body[i].tmoveat.minutes + ")\n";
                                                        tmoveAT += "(=(tmoveAt " + body[i].tmoveat.attractionC2.name.toLowerCase().replace(/ /g, "_") + " " + body[i].tmoveat.attractionC1.name.toLowerCase().replace(/ /g, "_") + " ) " + body[i].tmoveat.minutes + ")\n";

                                                        if (i == body.length - 1)
                                                            guardia = true;
                                                    }

                                                } else {
                                                    console.log("[addTmoveAtCity] PROBLEM: sensing part of tmoveAT is empty!");
                                                    return;
                                                }

                                                //var fileToWrite = "/Users/roberto/Desktop/shared_web/problems/city/roma-user.pddl";
                                                var fs = require('fs');
                                                fs.appendFile(fileToWrite, tmoveAT, function(err) {
                                                    console.log("[addTmoveAtCity] moveAtWrite", tmoveAT)
                                                    if (err)
                                                        return console.log(err);
                                                    console.log("[addTmoveAtCity] sensing part for tmoveAT was added!\n");
                                                    //call to goal and planner
                                                    if (guardia) {
                                                        setTimeout(goalAndPlanner, 5000);
                                                        guardia = false;
                                                    }
                                                });

                                            } else {
                                                //response.status(500).send({ error: "boo:(" });
                                                console.log("[addTmoveAtCity] tmove: internal server error");
                                                return;
                                            }
                                        })
                                    }; //fine request TmoveAT
                                } else
                                    console.log("*** Failed to post data in sensing table ***");
                            });
                        } else {
                            console.log("No tuple found in TMOVEAT with those parameters,add in tvisita and sensing...");
                            // we have to add both in Tmoveat and sensing tables
                            /* 
                             * 1. add in Tmoveat (from attraction to attraction)
                             * 2. retrieve id of tupla just added
                             * 3. insert into Sensing the instance of tmoveat
                             */
                            /* 1. */
                            request({
                                url: "http://localhost:8080/RestNeptis/webresources/entities.tmoveat/",
                                method: "POST",
                                json: {
                                    minutes: minutes,
                                    attractionC1: {
                                        id: sorgId
                                    },
                                    attractionC2: {
                                        id: destId
                                    }
                                },
                                headers: [{
                                    'content-type': 'application/json'
                                }]
                            }, function(error, response, body) {
                                console.log("Request statusCode: " + response.statusCode);
                                //console.log("*** response ", response);
                                if (!error & response.statusCode === 204) {
                                    console.log("*** TmoveAT added  *** ");
                                    /* 2. */
                                    request({
                                        url: "http://localhost:8080/RestNeptis/webresources/entities.tmoveat/" + sorgId + "," + destId + "," + minutes,
                                        method: "GET",
                                        json: true,
                                        headers: [{
                                            'content-type': 'application/json'
                                        }]
                                    }, function(error, response, body) {
                                        console.log("Request statusCode: " + response.statusCode);
                                        //console.log("*** response ", response);
                                        if (!error & response.statusCode === 200) {
                                            console.log("*** Get tmoveat succeded *** ");
                                            tmoveatId = body[0].id;
                                            /* 3. */
                                            request({
                                                url: "http://localhost:8080/RestNeptis/webresources/entities.sensing/",
                                                method: "POST",
                                                json: {
                                                    data: dd,
                                                    tmoveat: {
                                                        id: tmoveatId
                                                    }
                                                },
                                                headers: [{
                                                    'content-type': 'application/json'
                                                }]
                                            }, function(error, response, body) {
                                                console.log("Request statusCode: " + response.statusCode);
                                                //console.log("*** response ", response);
                                                if (!error & response.statusCode === 204) {
                                                    console.log("*** POST sensing succeded *** ");
                                                    //response.status(response.statusCode);
                                                    //res.send({ response : 'ok'})



                                                    // -- TMOVEAT 
                                                    var urlMoveAT = "http://localhost:8080/RestNeptis/webresources/entities.sensing/tmoveAT/city/cityId=" + cityId;
                                                    //var urlMoveAT = "http://localhost:8080/RestNeptis/webresources/entities.sensing/tmoveAT/city/cityId=1";

                                                    request({
                                                        url: urlMoveAT,
                                                        method: "GET",
                                                        json: true, // <--Very important!!!
                                                        headers: [{
                                                                'content-type': 'application/json'
                                                            }] // change to Json
                                                    }, function(error, response, body) {
                                                        console.log("Request statusCode: " + response.statusCode);
                                                        if (!error & response.statusCode === 200) {
                                                            //console.log("Select riuscita: "+utype+","+uname);
                                                            //console.log("response in xml: ",response.body);

                                                            /** CODE TO CREATE PROBLEM FILE **/
                                                            //scrittura su file

                                                            //(= (tmoveAt colosseo sanpietro) 4)

                                                            // da fare .. (= (tmoveAt sanpietro colosseo) 4)

                                                            var tmoveAT = "";

                                                            //console.log("body.length: ",body.length);

                                                            if (body.length >= 1) {
                                                                var guardia = false;
                                                                // se sensing ha 1 o 0 tuple ---> problema sulla length
                                                                for (var i = 0; i < body.length; i++) {
                                                                    tmoveAT += "(=(tmoveAt " + body[i].tmoveat.attractionC1.name.toLowerCase().replace(/ /g, "_") + " " + body[i].tmoveat.attractionC2.name.replace(/ /g, "_") + " ) " + body[i].tmoveat.minutes + ")\n";
                                                                    tmoveAT += "(=(tmoveAt " + body[i].tmoveat.attractionC2.name.toLowerCase().replace(/ /g, "_") + " " + body[i].tmoveat.attractionC1.name.replace(/ /g, "_") + " ) " + body[i].tmoveat.minutes + ")\n";

                                                                    if (i == body.length - 1)
                                                                        guardia = true;
                                                                }
                                                            } else {
                                                                console.log("PROBLEM: sensing part of tmoveAT is empty!");
                                                                return;
                                                            }



                                                            //var fileToWrite = "/Users/roberto/Desktop/shared_web/problems/city/roma-user.pddl";
                                                            var fs = require('fs');
                                                            fs.appendFile(fileToWrite, tmoveAT, function(err) {
                                                                if (err) {
                                                                    return console.log(err);
                                                                }
                                                                console.log("The sensing part for tmoveAT was added!\n");

                                                                if (guardia) {
                                                                    setTimeout(goalAndPlanner, 5000);
                                                                    guardia = false;
                                                                }
                                                            });

                                                        } else {
                                                            //response.status(500).send({ error: "boo:(" });
                                                            console.log("tmove: internal server error");
                                                            return;
                                                        }

                                                    }); //fine request TmoveAT




                                                } else console.log("ERROR while posting in sensing");
                                            });
                                            return;
                                        } else console.log("ERROR in getting tmoveat");
                                    });
                                    return;
                                } else console.log("ERROR: tmoveat not added!");
                            });
                        }
                        return;
                    } else console.log("Error in getting tmove attraction from sorg and dest. (non è 200)")
                });
            } // function tmoveAt


        } // if city

    } // fine google_distance?

    //--------------------------------------------------------------------------------------------------------
    //function goalAndPlanner(uname, umail, exclude, must, maxtime, n ){
    function goalAndPlanner() {
        //AGGIUNGO le pref utente e la metrica alla FINE del problem


        var exc = "";
        var mus = "";
        console.log(exclude);
        console.log("exclude.length", exclude.exclude.length);
        if (exclude.exclude.length > 0) {
            for (var i = 0; i < exclude.exclude.length; i++) {
                var e = exclude.exclude[i].name;
                exc += "(not (visitata " + e.replace(/ /g, "_") + ")) ";
            }
        }

        console.log(must);
        console.log("must.length", must.must.length);
        if (must.must.length > 0) {
            for (var i = 0; i < must.must.length; i++) {
                var m = must.must[i].name;
                mus += "(visitata " + m.replace(/ /g, "_") + ") ";
            }
        }

        var metrica = "maximize (n))\n)\n"
        var rat = "";
        console.log("rating.rating", rating.rating);
        if (rating.rating.length > 0) {
            for (var i = 0; i < rating.rating.length; i++) {
                var name = rating.rating[i].name;
                var star = rating.rating[i].rating;
                rat += "(= (rating " + name.replace(/ /g, "_") + ") " + star + ")\n";
            }
            metrica = "maximize (totalrating))\n)\n";
        }

        //(>= (n) "+n+")
        //(and .. )

        var goal = rat + "(neipressidi start)\n";
        goal += "(= (n) 0)\n(= (total) 0)\n(= (totalrating) 0)\n(= (maxtime) " + maxtime + ")\n)\n";
        goal += "(:goal\n (and (>= (n) " + n + ")" + mus + exc + " (<= (total) (maxtime)))\n)\n(:metric " + metrica;

        fs.appendFile(fileToWrite, goal, function(err) {
            if (err)
                throw err;
            console.log("\n[goalAndPlaner] problem " + uname + "-" + umail + ".pddl created! *** \n");

            //INVIO il piano 

            /*esempio*/
            //var plan = "[{\"route\": \"colosseo\"},{\"route\": \"fontana di trevi\"}]";
            // res.send(plan);


            /*** CHIAMATA AL PIANIFICATORE ***/
            var plan = "";
            var sol_output = "sol_" + umail;
            cd('/home/thomas/tesi/LPG');

            var problemPath = "/home/thomas/tesi/problems/" + ucategory + "/" + uname + "-" + umail + ".pddl";
            var solutionPath = "/home/thomas/tesi/LPG/neptis/" + sol_output;


            exec('./lpg -o neptis/domain.pddl -f ' + problemPath + '  -quality -out neptis/' + sol_output, function(status, output) {

                setTimeout(function() {
                    console.log("T I M E O U T _ R E A C  H E D !");
                }, 10000);
                if (status) {
                    res.status(500).end();
                    return;
                }

                console.log('Exit status:', status);
                console.log('Program output:', output);
                //cd('Ris');
                //res.sendFile(fileToWrite);
                //exec('less mysol',function(status,output){

                var LineByLineReader = require('line-by-line'),
                    lr = new LineByLineReader('/home/thomas/tesi/LPG/neptis/' + sol_output);


                lr.on('error', function(err) {
                    console.log(" 'err' contains error object x");
                    return;
                });

                var sem = 0; // per gestire una o più route per il formato json
                lr.on('line', function(line) {
                    // 'line' contains the current line without the trailing newline character.
                    // STARTING PARSER **
                    var string_vis = "(VISITA";
                    var index = line.indexOf(string_vis);
                    if (index > -1) {
                        //console.log(line);
                        var temp = line.substring(13);
                        //console.log("temp:"+temp);
                        var route = temp.substring(0, temp.indexOf(" "));
                        route = route.replace(/_/g, " ");

                        //console.log("route:" +route);
                        if (sem == 0)
                            plan = plan + "{\"route\":\"" + route + "\"}";
                        else plan = plan + ",{\"route\":\"" + route + "\"}";

                        //console.log("plan:" +plan);
                        sem = 1;
                    }
                });

                lr.on('end', function() {
                    // All lines are read, file is closed now.
                    console.log("End");
                    var ready = "[" + plan + "]";
                    console.log("ready: " + ready);
                    res.status(200);
                    res.send(ready);

                    exec('rm ' + solutionPath, function(status, output) {
                        if (status)
                            console.log("error during delete solution file");
                        else console.log("file solution deleted successfully");
                    });

                    /*
                    exec('rm '+problemPath, function(status, output) {
                    if(status)	
                    console.log("error during delete problem file");

                    else console.log("file problem deleted successfully"); 				
                    });
                    */
                    return;
                });

            }); //fine exec           


        }); //fine appendFile


    } //fine Goal&Planner
}); //fine plan
//------------------------------------------------------------------------------------------------------------

/* REPORT */
app.post('/report_queue', function(req, res) {
    console.log("/report_queue");

    type = req.body.type;
    category = req.body.category;
    nameId = req.body.nameId;
    attrId = req.body.attractionId;
    minutes = req.body.minutes;
    dd = req.body.data; // aggiungerla in sensing


    // se esiste una tupla in tcoda di colosseo 10' non devo aggiungere in tcoda ma solo in sensing 
	console.log("[/report_queue] type: %s; category: %s",type, category);
    if (type === 'Queue') {
        if (category === 'City') {
            request({
                url: "http://localhost:8080/RestNeptis/webresources/entities.tcoda/" + attrId + "," + minutes,
                method: "GET",
                json: true,
                headers: [{
                    'content-type': 'application/json'
                }]
            }, function(error, response, body) {
                console.log("Request statusCode: " + response.statusCode);
                //console.log("*** response ", response);
                if (!error & response.statusCode === 200) {
                    console.log("*** Get tcoda from minutes and attraction succeded *** ");

                    if (body.length > 0) {
                        //there exists a queue for that attraction with those minutes so we have to add only in sensing table
                        tcodaId = body[0].id;
                        request({
                            url: "http://localhost:8080/RestNeptis/webresources/entities.sensing/",
                            method: "POST",
                            json: {
                                data: dd,
                                tcoda: {
                                    id: tcodaId
                                }
                            },
                            headers: [{
                                'content-type': 'application/json'
                            }]
                        }, function(error, response, body) {
                            console.log("Request statusCode: " + response.statusCode);
                            //console.log("*** response ", response);
                            if (!error & response.statusCode === 204) {
                                console.log("*** Post only in sensing succeded *** ");
                                res.status(response.statusCode);
                                res.send({
                                    response: 'ok'
                                })

                                return;
                            }

                        });
                    } else {
                        console.log("No tuple found in tcoda with those parameters,add in tcoda and sensing...");
                        // we have to add both in Tcoda and sensing tables
                        /* 
                         * 1. add in Tcoda
                         * 2. retrieve id of tupla just added
                         * 3. insert into Sensing the instance of tcoda
                         */
                        /* 1. */
                        request({
                            url: "http://localhost:8080/RestNeptis/webresources/entities.tcoda/",
                            method: "POST",
                            json: {
                                minutes: minutes,
                                attractionC: {
                                    id: attrId
                                }
                            },
                            headers: [{
                                'content-type': 'application/json'
                            }]
                        }, function(error, response, body) {
                            console.log("Request statusCode: " + response.statusCode);
                            //console.log("*** response ", response);
                            if (!error & response.statusCode === 204) {
                                console.log("*** Tcoda added  *** ");
                                /* 2. */
                                request({
                                    url: "http://localhost:8080/RestNeptis/webresources/entities.tcoda/" + attrId + "," + minutes,
                                    method: "GET",
                                    json: true,
                                    headers: [{
                                        'content-type': 'application/json'
                                    }]
                                }, function(error, response, body) {
                                    console.log("Request statusCode: " + response.statusCode);
                                    //console.log("*** response ", response);
                                    if (!error & response.statusCode === 200) {
                                        console.log("*** Get tcoda succeded *** ");
                                        tcodaId = body[0].id;
                                        /* 3. */
                                        request({
                                            url: "http://localhost:8080/RestNeptis/webresources/entities.sensing/",
                                            method: "POST",
                                            json: {
                                                data: dd,
                                                tcoda: {
                                                    id: tcodaId
                                                }
                                            },
                                            headers: [{
                                                'content-type': 'application/json'
                                            }]
                                        }, function(error, response, body) {
                                            console.log("Request statusCode: " + response.statusCode);
                                            //console.log("*** response ", response);
                                            if (!error & response.statusCode === 204) {
                                                console.log("*** POST sensing succeded *** ");
                                                res.status(response.statusCode);
                                                res.send({
                                                    response: 'ok'
                                                })
                                                return;
                                            } else console.log("ERROR while posting in sensing");
                                        });
                                        return;
                                    } else console.log("ERROR in getting tcoda");

                                });
                                return;
                            } else console.log("ERROR: tcoda not added!");

                        });
                    }
                    return;
                }
            });
        }
        if (category === "Museum") {
            request({
                url: "http://localhost:8080/RestNeptis/webresources/entities.tcoda/museum/" + attrId + "," + minutes,
                method: "GET",
                json: true,
                headers: [{
                    'content-type': 'application/json'
                }]
            }, function(error, response, body) {
                console.log("Request statusCode: " + response.statusCode);
                //console.log("*** response ", response);
                if (!error & response.statusCode === 200) {
                    console.log("*** Get tcoda from minutes and attraction succeded *** ");

                    if (body.length > 0) {
                        //there exists a queue for that attraction with those minutes so we have to add only in sensing table
                        tcodaId = body[0].id;
                        request({
                            url: "http://localhost:8080/RestNeptis/webresources/entities.sensing/",
                            method: "POST",
                            json: {
                                data: dd,
                                tcoda: {
                                    id: tcodaId
                                }
                            },
                            headers: [{
                                'content-type': 'application/json'
                            }]
                        }, function(error, response, body) {
                            console.log("Request statusCode: " + response.statusCode);
                            //console.log("*** response ", response);
                            if (!error & response.statusCode === 204) {
                                console.log("*** Post only in sensing succeded *** ");
                                res.status(response.statusCode);
                                res.send({
                                    response: 'ok'
                                })

                                return;
                            }

                        });
                    } else {
                        console.log("No tuple found in tcoda with those parameters,add in tcoda and sensing...");
                        // we have to add both in Tcoda and sensing tables
                        /* 
                         * 1. add in Tcoda
                         * 2. retrieve id of tupla just added
                         * 3. insert into Sensing the instance of tcoda
                         */
                        /* 1. */
                        request({
                            url: "http://localhost:8080/RestNeptis/webresources/entities.tcoda/",
                            method: "POST",
                            json: {
                                minutes: minutes,
                                areaM: {
                                    id: attrId
                                }
                            },
                            headers: [{
                                'content-type': 'application/json'
                            }]
                        }, function(error, response, body) {
                            console.log("Request statusCode: " + response.statusCode);
                            //console.log("*** response ", response);
                            if (!error & response.statusCode === 204) {
                                console.log("*** Tcoda added  *** ");
                                /* 2. */
                                request({
                                    url: "http://localhost:8080/RestNeptis/webresources/entities.tcoda/museum/" + attrId + "," + minutes,
                                    method: "GET",
                                    json: true,
                                    headers: [{
                                        'content-type': 'application/json'
                                    }]
                                }, function(error, response, body) {
                                    console.log("Request statusCode: " + response.statusCode);
                                    //console.log("*** response ", response);
                                    if (!error & response.statusCode === 200) {
                                        console.log("*** Get tcoda succeded *** ");
                                        tcodaId = body[0].id;
                                        /* 3. */
                                        request({
                                            url: "http://localhost:8080/RestNeptis/webresources/entities.sensing/",
                                            method: "POST",
                                            json: {
                                                data: dd,
                                                tcoda: {
                                                    id: tcodaId
                                                }
                                            },
                                            headers: [{
                                                'content-type': 'application/json'
                                            }]
                                        }, function(error, response, body) {
                                            console.log("Request statusCode: " + response.statusCode);
                                            //console.log("*** response ", response);
                                            if (!error & response.statusCode === 204) {
                                                console.log("*** POST sensing succeded *** ");
                                                res.status(response.statusCode);
                                                res.send({
                                                    response: 'ok'
                                                })
                                                return;
                                            } else console.log("ERROR while posting in sensing");
                                        });
                                        return;
                                    } else console.log("ERROR in getting tcoda");

                                });
                                return;
                            } else console.log("ERROR: tcoda not added!");

                        });
                    }
                    return;
                }
            });
        } // if museum
        if (category === 'Opened Air Museum') {
            request({
                url: "http://localhost:8080/RestNeptis/webresources/entities.tcoda/oam/" + attrId + "," + minutes,
                method: "GET",
                json: true,
                headers: [{
                    'content-type': 'application/json'
                }]
            }, function(error, response, body) {
                console.log("[/report_queue] GET entities.tcoda/oam request statusCode: " + response.statusCode);
                //console.log("*** response ", response);
                if (!error & response.statusCode === 200) {
                    console.log("[/report_queue] GET tcoda from minutes and attraction succeded");

                    if (body.length > 0) {
                        //there exists a queue for that attraction with those minutes so we have to add only in sensing table
                        tcodaId = body[0].id;
                        request({
                            url: "http://localhost:8080/RestNeptis/webresources/entities.sensing/",
                            method: "POST",
                            json: {
                                data: dd,
                                tcoda: {
                                    id: tcodaId
                                }
                            },
                            headers: [{
                                'content-type': 'application/json'
                            }]
                        }, function(error, response, body) {
                            console.log("[/report_queue] POST entities.sensing/ request statusCode: " + response.statusCode);
                            //console.log("*** response ", response);
                            if (!error & response.statusCode === 204) {
                                console.log("[/report_queue] POST only in sensing successful");
                                res.status(response.statusCode);
                                res.send({
                                    response: 'ok'
                                })

                                return;
                            }

                        });
                    } else {
                        console.log("[/report_queue] No tuple found in tcoda with those parameters,add in tcoda and sensing");
                        // we have to add both in Tcoda and sensing tables
                        /* 
                         * 1. add in Tcoda
                         * 2. retrieve id of tupla just added
                         * 3. insert into Sensing the instance of tcoda
                         */
                        /* 1. */
                        request({
                            url: "http://localhost:8080/RestNeptis/webresources/entities.tcoda/",
                            method: "POST",
                            json: {
                                minutes: minutes,
                                attractionOam: {
                                    id: attrId
                                }
                            },
                            headers: [{
                                'content-type': 'application/json'
                            }]
                        }, function(error, response, body) {
                            console.log("[/report_queue] POST entities.tcoda/ request statusCode: " + response.statusCode);
                            //console.log("*** response ", response);
                            if (!error & response.statusCode === 204) {
                                console.log("[/report_queue] POST tcoda successful");
                                /* 2. */
                                request({
                                    url: "http://localhost:8080/RestNeptis/webresources/entities.tcoda/oam/" + attrId + "," + minutes,
                                    method: "GET",
                                    json: true,
                                    headers: [{
                                        'content-type': 'application/json'
                                    }]
                                }, function(error, response, body) {
                                    console.log("[/report_queue] Request statusCode: " + response.statusCode);
                                    //console.log("*** response ", response);
                                    if (!error & response.statusCode === 200) {
                                        console.log("*** Get tcoda succeded *** ");
                                        tcodaId = body[0].id;
                                        /* 3. */
                                        request({
                                            url: "http://localhost:8080/RestNeptis/webresources/entities.sensing/",
                                            method: "POST",
                                            json: {
                                                data: dd,
                                                tcoda: {
                                                    id: tcodaId
                                                }
                                            },
                                            headers: [{
                                                'content-type': 'application/json'
                                            }]
                                        }, function(error, response, body) {
                                            console.log("Request statusCode: " + response.statusCode);
                                            //console.log("*** response ", response);
                                            if (!error & response.statusCode === 204) {
                                                console.log("*** POST sensing succeded *** ");
                                                res.status(response.statusCode);
                                                res.send({
                                                    response: 'ok'
                                                })
                                                return;
                                            } else console.log("ERROR while posting in sensing");
                                        });
                                        return;
                                    } else console.log("ERROR in getting tcoda");

                                });
                                return;
                            } else console.log("ERROR: tcoda not added!");

                        });
                    }
                    return;
                }
            });
        }

    } // if queue
    if (type === 'Visit') {
        if (category === 'City') {
            request({
                url: "http://localhost:8080/RestNeptis/webresources/entities.tvisita/" + attrId + "," + minutes,
                method: "GET",
                json: true,
                headers: [{
                    'content-type': 'application/json'
                }]
            }, function(error, response, body) {
                console.log("Request statusCode: " + response.statusCode);
                //console.log("*** response ", response);
                if (!error & response.statusCode === 200) {
                    console.log("*** Get visit time from minutes and attraction succeded *** ");

                    if (body.length > 0) {
                        //there exists a visit time for that attraction with those minutes so we have to add only in sensing table
                        tvisitaId = body[0].id;
                        request({
                            url: "http://localhost:8080/RestNeptis/webresources/entities.sensing/",
                            method: "POST",
                            json: {
                                data: dd,
                                tvisita: {
                                    id: tvisitaId
                                }
                            },
                            headers: [{
                                'content-type': 'application/json'
                            }]
                        }, function(error, response, body) {
                            console.log("Request statusCode: " + response.statusCode);
                            //console.log("*** response ", response);
                            if (!error & response.statusCode === 204) {
                                console.log("*** Post only in sensing succeded *** ");
                                res.status(response.statusCode);
                                res.send({
                                    response: 'ok'
                                })

                                return;
                            }

                        });
                    } else {
                        console.log("No tuple found in TVISITA with those parameters,add in tvisita and sensing...");
                        // we have to add both in Tcoda and sensing tables
                        /* 
                         * 1. add in Tcoda
                         * 2. retrieve id of tupla just added
                         * 3. insert into Sensing the instance of tcoda
                         */
                        /* 1. */
                        request({
                            url: "http://localhost:8080/RestNeptis/webresources/entities.tvisita/",
                            method: "POST",
                            json: {
                                minutes: minutes,
                                attractionC: {
                                    id: attrId
                                }
                            },
                            headers: [{
                                'content-type': 'application/json'
                            }]
                        }, function(error, response, body) {
                            console.log("Request statusCode: " + response.statusCode);
                            //console.log("*** response ", response);
                            if (!error & response.statusCode === 204) {
                                console.log("*** Tvisita added  *** ");
                                /* 2. */
                                request({
                                    url: "http://localhost:8080/RestNeptis/webresources/entities.tvisita/" + attrId + "," + minutes,
                                    method: "GET",
                                    json: true,
                                    headers: [{
                                        'content-type': 'application/json'
                                    }]
                                }, function(error, response, body) {
                                    console.log("Request statusCode: " + response.statusCode);
                                    //console.log("*** response ", response);
                                    if (!error & response.statusCode === 200) {
                                        console.log("*** Get tcoda succeded *** ");
                                        tvisitaId = body[0].id;
                                        /* 3. */
                                        request({
                                            url: "http://localhost:8080/RestNeptis/webresources/entities.sensing/",
                                            method: "POST",
                                            json: {
                                                data: dd,
                                                tvisita: {
                                                    id: tvisitaId
                                                }
                                            },
                                            headers: [{
                                                'content-type': 'application/json'
                                            }]
                                        }, function(error, response, body) {
                                            console.log("Request statusCode: " + response.statusCode);
                                            //console.log("*** response ", response);
                                            if (!error & response.statusCode === 204) {
                                                console.log("*** POST sensing succeded *** ");
                                                res.status(response.statusCode);
                                                res.send({
                                                    response: 'ok'
                                                })
                                                return;
                                            } else console.log("ERROR while posting in sensing");
                                        });
                                        return;
                                    } else console.log("ERROR in getting tvisita");

                                });
                                return;
                            } else console.log("ERROR: tvisita not added!");

                        });
                    }
                    return;
                }
            });
        }

        if (category === 'Museum') {
            request({
                url: serverName + "entities.tvisita/museum/" + attrId + "," + minutes,
                method: "GET",
                json: true,
                headers: [{
                    'content-type': 'application/json'
                }]
            }, function(error, response, body) {
                console.log("Request statusCode: " + response.statusCode);
                //console.log("*** response ", response);
                if (!error & response.statusCode === 200) {
                    console.log("*** Get visit time from minutes and attraction succeded *** ");

                    if (body.length > 0) {
                        //there exists a visit time for that attraction with those minutes so we have to add only in sensing table
                        tvisitaId = body[0].id;
                        request({
                            url: serverName + "entities.sensing/",
                            method: "POST",
                            json: {
                                data: dd,
                                tvisita: {
                                    id: tvisitaId
                                }
                            },
                            headers: [{
                                'content-type': 'application/json'
                            }]
                        }, function(error, response, body) {
                            console.log("Request statusCode: " + response.statusCode);
                            //console.log("*** response ", response);
                            if (!error & response.statusCode === 204) {
                                console.log("*** Post only in sensing succeded *** ");
                                res.status(response.statusCode);
                                //res.send({ response : 'ok'})

                                return;
                            }

                        });
                    } else {
                        console.log("No tuple found in TVISITA with those parameters,add in tvisita and sensing...");
                        // we have to add both in Tcoda and sensing tables
                        /* 
                         * 1. add in Tcoda
                         * 2. retrieve id of tupla just added
                         * 3. insert into Sensing the instance of tcoda
                         */
                        /* 1. */
                        request({
                            url: serverName + "entities.tvisita/",
                            method: "POST",
                            json: {
                                minutes: minutes,
                                attractionM: {
                                    id: attrId
                                }
                            },
                            headers: [{
                                'content-type': 'application/json'
                            }]
                        }, function(error, response, body) {
                            console.log("Request statusCode: " + response.statusCode);
                            //console.log("*** response ", response);
                            if (!error & response.statusCode === 204) {
                                console.log("*** Tvisita added  *** ");
                                /* 2. */
                                request({
                                    url: serverName + "entities.tvisita/museum/" + attrId + "," + minutes,
                                    method: "GET",
                                    json: true,
                                    headers: [{
                                        'content-type': 'application/json'
                                    }]
                                }, function(error, response, body) {
                                    console.log("Request statusCode: " + response.statusCode);
                                    //console.log("*** response ", response);
                                    if (!error & response.statusCode === 200) {
                                        console.log("*** Get tcoda succeded *** ");
                                        tvisitaId = body[0].id;
                                        /* 3. */
                                        request({
                                            url: serverName + "entities.sensing/",
                                            method: "POST",
                                            json: {
                                                data: dd,
                                                tvisita: {
                                                    id: tvisitaId
                                                }
                                            },
                                            headers: [{
                                                'content-type': 'application/json'
                                            }]
                                        }, function(error, response, body) {
                                            console.log("Request statusCode: " + response.statusCode);
                                            //console.log("*** response ", response);
                                            if (!error & response.statusCode === 204) {
                                                console.log("*** POST sensing succeded *** ");
                                                res.status(response.statusCode);
                                                //res.send({ response : 'ok'})
                                                return;
                                            } else console.log("ERROR while posting in sensing");
                                        });
                                        return;
                                    } else console.log("ERROR in getting tvisita");

                                });
                                return;
                            } else console.log("ERROR: tvisita not added!");

                        });
                    }
                    return;
                }
            });
        } // if category museum

        if (category === 'Opened Air Museum') {
			console.log("[/report_queue] attrId: %s; minutes: %s", attrId, minutes);
            request({
                url: serverName + "entities.tvisita/oam/" + attrId + "," + minutes,
                method: "GET",
                json: true,
                headers: [{
                    'content-type': 'application/json'
                }]
            }, function(error, response, body) {
                console.log("[/report_queue] GET entities.tvisita/oam/ request statusCode: " + response.statusCode);
                if (!error & response.statusCode === 200) {
                    if (body.length > 0) {
                        //there exists a visit time for that attraction with those minutes so we have to add only in sensing table
                        tvisitaId = body[0].id;
                        request({
                            url: serverName + "entities.sensing/",
                            method: "POST",
                            json: {
                                data: dd,
                                tvisita: {
                                    id: tvisitaId
                                }
                            },
                            headers: [{
                                'content-type': 'application/json'
                            }]
                        }, function(error, response, body) {
                            console.log("[/report_queue] POST entities.sensing/ request statusCode: " + response.statusCode);
                            if (!error & response.statusCode === 204) {
                                console.log("[/report_queue] POST in sensing successful");
                                res.status(response.statusCode);
                                //res.send({ response : 'ok'})
                                return;
                            }

                        });
                    } else {
                        console.log("[/report_queue] No tuple found in TVISITA with those parameters,add in tvisita and sensing...");
                        // we have to add both in Tcoda and sensing tables
                        /* 
                         * 1. add in Tvisita
                         * 2. retrieve id of tupla just added
                         * 3. insert into Sensing the instance of tcoda
                         */
                        /* 1. */
                        request({
                            url: serverName + "entities.tvisita/",
                            method: "POST",
                            json: {
                                minutes: minutes,
                                attractionOam: {
                                    id: attrId
                                }
                            },
                            headers: [{
                                'content-type': 'application/json'
                            }]
                        }, function(error, response, body) {
                            console.log("[/report_queue] POST entities.tvisita/ request statusCode: " + response.statusCode);
                            if (!error & response.statusCode === 204) {
                                console.log("*** Tvisita added  *** ");
                                /* 2. */
                                request({
                                    url: serverName + "entities.tvisita/oam/" + attrId + "," + minutes,
                                    method: "GET",
                                    json: true,
                                    headers: [{
                                        'content-type': 'application/json'
                                    }]
                                }, function(error, response, body) {
                                    console.log("Request statusCode: " + response.statusCode);
                                    //console.log("*** response ", response);
                                    if (!error & response.statusCode === 200) {
                                        console.log("*** Get tcoda succeded *** ");
                                        tvisitaId = body[0].id;
                                        /* 3. */
                                        request({
                                            url: serverName + "entities.sensing/",
                                            method: "POST",
                                            json: {
                                                data: dd,
                                                tvisita: {
                                                    id: tvisitaId
                                                }
                                            },
                                            headers: [{
                                                'content-type': 'application/json'
                                            }]
                                        }, function(error, response, body) {
                                            console.log("Request statusCode: " + response.statusCode);
                                            //console.log("*** response ", response);
                                            if (!error & response.statusCode === 204) {
                                                console.log("*** POST sensing succeded *** ");
                                                res.status(response.statusCode);
                                                //res.send({ response : 'ok'})
                                                return;
                                            } else console.log("ERROR while posting in sensing");
                                        });
                                        return;
                                    } else console.log("ERROR in getting tvisita");

                                });
                                return;
                            } else console.log("ERROR: tvisita not added!");

                        });
                    }
                    return;
                }
            });
        } // if category oam


    } // if visit time


}); // route_queue

app.post('/compute-plan-museum', function(req, res) {

    console.log(req.body);

    var rating = req.body.rating;

    var umail = req.body.mail;
    var ucategory = req.body.category; // {city, museum, oam}
    var name = req.body.type; // for example {Rome}
    var uname = name.toLowerCase().replace(/ /g, "_");
    var uid = req.body.id; //1 = id museo 
    var hh = req.body.hh; //available time
    var mm = req.body.mm;

    var must = req.body.must; //must
    var exclude = req.body.exclude; //exclude


    var lat = req.body.lat;
    var lon = req.body.lon;
    var dd = req.body.data;
    var travel_mode = req.body.travel_mode;
    var data_mode = req.body.data_mode;

    var n = 1; // è il numero di step minimo che deve fare il planner

    var maxtime = ((hh * 60) + (mm * 1));


    ///home/thomas/tesi/problems/city/roma.pddl' 

    var fileProblem = "/home/thomas/tesi/problems/" + ucategory + "/" + uname + ".pddl";
    var fileToWrite = "/home/thomas/tesi/problems/" + ucategory + "/" + uname + "-" + umail + ".pddl";


    console.log("*** POST '/compute-plan-museum': ", umail);
    res.setHeader('Content-Type', 'application/json');


    // Start WRITE FILEs operations ** THESE OPERATIONS MUST BE SEQUENTIAL 
    var fs = require('fs');



    /* ANDROID APP PART*/
    // ASYNC with nested callbacks
    //COPIO IL FILE per aggiungere le preferenze dell utente
    fs.readFile(fileProblem, (err, data) => {
        if (err) throw err;


        fs.writeFile(fileToWrite, data, function(err) {
            if (err) throw err;


            /** SENSING PART **/


            // -- T CODA
            //console.log("http://localhost:8080/RestNeptis/webresources/entities./tcoda/"+ucategory+"/id="+uid);
            var urlAttr = "http://localhost:8080/RestNeptis/webresources/entities.aream/museumId=" + uid;
            var urlCoda = "http://localhost:8080/RestNeptis/webresources/entities.sensing/tcoda/museum/attrId=";


            request({
                url: urlAttr,
                method: "GET",
                json: true, // <--Very important!!!
                headers: [{
                        'content-type': 'application/json'
                    }] // change to Json
            }, function(error, response, body) {

                if (error) {
                    console.log(error);
                    return;

                }

                //console.log(":::::::::::::TCODA::::::::::::::::::Request statusCode: "+response.statusCode);

                if (!error & response.statusCode === 200) {
                    var body_length = body.length;
                    var cont = 0;
                    for (var i = 0; i < body.length; i++) {
                        var attrId = body[i].id;
                        write_tvisita(attrId, i, body_length);
                        cont++;
                        console.log("*** url chiamata coda ", urlCoda + attrId);
                        request({
                                    url: urlCoda + attrId,
                                    method: "GET",
                                    json: true, // <--Very important!!!
                                    headers: [{
                                        'content-type': 'application/json'
                                    }]
                                }, function(error, response, body) {

                                    if (error) {
                                        console.log(error);
                                        return;

                                    }

                                    console.log("Request statusCode: " + response.statusCode);

                                    if (!error & response.statusCode === 200) {
                                        if (body.length > 0) {
                                            //console.log("::::::::::::::::::::body tcoda ",body[0].tcoda.areaM.name);

                                            var tcoda = "";

                                            tcoda = "(= (tcoda " + body[0].tcoda.areaM.name.toLowerCase().replace(/ /g, "_") + " ) " + body[0].tcoda.minutes + ")\n";

                                            var fs = require('fs');
                                            fs.appendFile(fileToWrite, tcoda, function(err) {
                                                if (err) {
                                                    console.log(err);
                                                    res.status(500).end();
                                                    return;
                                                }
                                                console.log("The sensing part for tcoda was added!\n");

                                            });

                                            /* tvisita */
                                            //write_tvisita(attrId);

                                        } //fine 200 tcoda 

                                    }
                                }

                            ) //fine request coda
                    } // fine for

                }; //fine get attractionM


            })




        }); //write




    }); //fine read

    function write_tvisita(attrId, i, body_length) {
        console.log("***attrazione per tvisita***", attrId);
        var urlVisita = "http://localhost:8080/RestNeptis/webresources/entities.sensing/tvisita/museum/attrId=";
        request({
            url: urlVisita + attrId,
            method: "GET",
            json: true, // <--Very important!!!
            headers: [{
                    'content-type': 'application/json'
                }] // change to Json
        }, function(error, response, body) {

            if (error) {
                console.log(error);
                return;

            }

            console.log("Request statusCode: " + response.statusCode);

            if (!error & response.statusCode === 200) {
                if (body.length > 0) {

                    var tvisita = "";

                    tvisita = "(=(tvisita " + body[0].tvisita.attractionM.name.toLowerCase().replace(/ /g, "_") + " ) " + body[0].tvisita.minutes + ")\n";

                    var fs = require('fs');
                    fs.appendFile(fileToWrite, tvisita, function(err) {
                        if (err) {
                            console.log(err);
                            res.status(500).end();
                            return;

                        } else {
                            console.log("The sensing part for tvisita was added!\n");

                            if (i === body_length - 1) {
                                setTimeout(goalAndPlanner, 5000);
                            }


                        }

                    });



                    /* fine tvisita */

                } else {
                    //var tvisita = "";
                    //tvisita = "(=(tvisita "+body[0].tvisita.attractionM.name.replace(/ /g,"_")+" ) 1)\n";

                    if (i === body_length - 1) {
                        setTimeout(goalAndPlanner, 5000);
                    }
                };




            }
        });
    }



    //--------------------------------------------------------------------------------------------------------
    //function goalAndPlanner(uname, umail, exclude, must, maxtime, n ){
    function goalAndPlanner() {
        //AGGIUNGO le pref utente e la metrica alla FINE del problem


        var exc = "";
        var mus = "";
        console.log(exclude);
        console.log("exclude.length", exclude.exclude.length);
        if (exclude.exclude.length > 0) {

            for (var i = 0; i < exclude.exclude.length; i++) {
                var e = exclude.exclude[i].name;
                exc += "(not (visitata " + e.replace(/ /g, "_") + ")) ";
            }

        }
        console.log(must);
        console.log("must.length", must.must.length);
        if (must.must.length > 0) {

            for (var i = 0; i < must.must.length; i++) {
                var m = must.must[i].name;
                mus += "(visitata " + m.replace(/ /g, "_") + ") ";
            }

        }

        var metrica = "maximize (n))\n)\n"
        var rat = "";
        console.log("rating.rating", rating.rating);
        if (rating.rating.length > 0) {
            for (var i = 0; i < rating.rating.length; i++) {
                var name = rating.rating[i].name;
                var star = rating.rating[i].rating;
                rat += "(= (rating " + name.replace(/ /g, "_") + ") " + star + ")\n";
            }

            metrica = "maximize (totalrating))\n)\n";


        }




        fs.appendFile(fileToWrite, rat + "(neipressidi start)\n(= (n) 0)\n(= (total) 0)\n(= (totalrating) 0)\n(= (maxtime) " + maxtime + ")\n)\n(:goal\n(and " + mus + exc + " (>= (n) " + n + ") (<= (total) (maxtime)))\n)\n(:metric " + metrica,
            function(err) {
                if (err) throw err;
                console.log("\n*** problem " + uname + "-" + umail + ".pddl created! *** \n");

                //INVIO il piano 

                /*esempio*/
                //var plan = "[{\"route\": \"colosseo\"},{\"route\": \"fontana di trevi\"}]";
                // res.send(plan);


                /*** CHIAMATA AL PIANIFICATORE ***/
                var plan = "";
                var sol_output = "sol_" + ucategory + umail;
                cd('/home/thomas/tesi/LPG');

                var problemPath = "/home/thomas/tesi/problems/" + ucategory + "/" + uname + "-" + umail + ".pddl";
                var solutionPath = "/home/thomas/tesi/LPG/neptis/" + sol_output;



                exec('./lpg -o neptis/domain.pddl -f ' + problemPath + '  -quality -out neptis/' + sol_output, function(status, output) {

                    setTimeout(function() {
                        console.log("T I M E O U T _ R E A C  H E D !");
                    }, 10000);

                    if (status) {
                        res.status(500).end();
                        return;
                    }
                    console.log('Exit status:', status);
                    console.log('Program output:', output);
                    //cd('Ris');
                    //res.sendFile(fileToWrite);
                    //exec('less mysol',function(status,output){

                    var LineByLineReader = require('line-by-line'),
                        lr = new LineByLineReader('/home/thomas/tesi/LPG/neptis/' + sol_output);

                    lr.on('error', function(err) {
                        console.log(" 'err' contains error object qui");
                        return;
                    });

                    var sem = 0; // per gestire una o più route per il formato json
                    line_temp = "";
                    lr.on('line', function(line) {
                        // 'line' contains the current line without the trailing newline character.
                        // STARTING PARSER **


                        var string = line.split(" ");

                        //console.log("0:"+string[0]+" 1:"+string[1]+" 2:"+ string[2]+" 3:"+string[3]);

                        if (string[3] === "(VISITA") {
                            if (line_temp != string[5])
                                if (sem == 0)
                                    plan = plan + "{\"route\":\"" + string[5].substring(0, string[5].length - 1).replace(/_/g, " ") + "\"}";
                                else plan = plan + ",{\"route\":\"" + string[5].substring(0, string[5].length - 1).replace(/_/g, " ") + "\"}";

                            sem = 1;
                            line_temp = string[5];
                            console.log("---> plan: " + plan);
                        }
                        /*/
                        var string_vis ="(VISITA";		
                        var index = line.indexOf(string_vis);
                        if(index > -1){

                        //console.log(line);
                        var temp = line.substring(13);
                        //console.log("temp:"+temp);
                        var route = temp.substring(0,temp.indexOf(" "));
                        route = route.replace(/_/g," ");

                        //console.log("route:" +route);
                        if(sem == 0)
                        plan=plan+"{\"route\":\""+route+"\"}";
                        else plan=plan+",{\"route\":\""+route+"\"}";

                        //console.log("plan:" +plan);
                        sem = 1;	
                        }	

                        */

                    });

                    lr.on('end', function() {
                        // All lines are read, file is closed now.
                        console.log("End");
                        var ready = "[" + plan + "]";
                        console.log("ready: " + ready);
                        res.status(200);
                        res.send(ready);


                        exec('rm ' + solutionPath, function(status, output) {
                            if (status)
                                console.log("error during delete solution file");

                            else console.log("file solution deleted successfully");
                        });

                        /*
                        exec('rm '+problemPath, function(status, output) {
                        if(status)	
                        console.log("error during delete problem file");

                        else console.log("file problem deleted successfully"); 				
                        });
                        */
                        return;

                    });



                }); //fine exec           


            }); //fine appendFile


    } //fine Goal&Planner
    //------------------------------------------------------------------------------------------------------------

}); //fine compute-plan-museum

app.post('/avg_queue_time', function(req, res) {
    var attrId = req.body.attrId;
    var today_date = req.body.date;
    var today = moment(today_date).format('DD-MM-YYYY');
    var month_ago = today.subtract(30, 'days');

    request({
        url: serverName + "entities.sensing/avg/tqueue/city/attractionCid=" + attrId,
        method: "GET",
        json: true,
        headers: [{
            'content-type': 'application/json'
        }]
    }, function(error, response, body) {
        console.log("Request statusCode: " + response.statusCode);
        if (!error & response.statusCode === 200) {
            var curr_date;
            var queue_value;
            var avg;
            for (var i = 0; i < body.length; i++) {
                curr_date = moment(body[i].data).format('DD-MM-YYY');
                queue_value = body[i].tcoda.minutes;
                var diff = curr_date.diff(month_ago, 'days'); //returns difference in days b/w two date (curr_date - month_ago)

                avg += queue_value * (diff / 30);
                console.log("data corrente ", curr_date, ",un mese fa ", month_ago, ",differenza in giorni ", diff);

            }


            //res.send({ error : '0'});

            return;
        } else {
            //res.status(response.statusCode);
            //res.send({error : 'reg_error'});
            //res.send(body);
            console.log("/avg failed!: ");
            return;
        }
    });
});

module.exports = app;
