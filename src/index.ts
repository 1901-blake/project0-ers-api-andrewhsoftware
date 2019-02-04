import express = require("express");

import bodyParser = require("body-parser");

import path from 'path';

import session from  'express-session';

import usersRouter from "./routers/users.router";

import authMiddleware from "./middleware/auth.middleware";

import loginRouter from "./routers/login.router";

import reimbursmentsRouter from "./routers/reimbursements.router";

import { foo } from "./dao/reimbursment.dao";

foo();

const app = express();

//allows use of a file/folder system for direct file retreval
//app.use(express.static(path.join(__dirname, 'static')));

// set up body parser to convert json string to js object
app.use(bodyParser.json());

// set up a sesson and attach it. we keep the session object, and a session id is sent with the response to the user
// if the session id matches a previous session this attaches the session object directly to the object
const sess = {
    secret: 'WeNoLongerSayNi',
    cookie: {secure: false},
    resave: false,
    saveUninitialized: false
};
app.use(session(sess));

// console.logs that this server was requested from
app.use((req, res, next) => {
    console.log(`request was made with url: ${req.url} and method ${req.method}`);
    // the next method allows the request to fall through after handling above
    next();
});

app.use('', authMiddleware);
// auth middleware.

app.use('/login', loginRouter );
app.use('/reimbursment', reimbursmentsRouter );
app.use('/users', usersRouter );
// redirect the traffic

app.get('/', (req, res) => {
    //redirect for index;
});


app.use((req, res) => {
    console.log(`You can't access this`);
    res.sendStatus(400);
});
//don't send bad request mmkay

app.listen(3000);
console.log('application started on port 3000');
// Hey Listen!(to port 3000) if a user calls on this port, the above callback will run
















// provides a callback for what happens when a computer tries to get from this computer
// app.get('/relative url', (req, res) => {// req is the entire request. res is your response})
// app.use will use up any http method

/*
    http methods. this is the other computer talking to us
        get - request resource
        post - create resource
        put - create or update resource // replaces everything
        delete - delete resource
        patch - partial update to resource // replaces only information supplied. everything else stays
    http status codes
        100s - info
        200s - success
        300s - redirects, "i dont have the info, heres the server the server that does"
        400s - the request was bad, its their fault
        500s - the request was good, but i had an error its my fault
    //http request has a head and body
        head has a http method, a url, credentials and a content type
        body is the json object
    http response has a head and body too
        head has status code and content type
        body is a json object
    network protocol
        http runs on tcp[default port:80] (as opposed to udp) which runs on ip
*/