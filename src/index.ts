import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import { usersRouter } from './routers/usersRouter';
import { reimbursementRouter } from './routers/reimbursementsRouter';
import { loginRouter } from './Routers/login.router';

const appStart = express();

const sess = {
    secret: 'secretSecretIGotASecret',
    cookie: {secure: false},
    resave: false,
    saveUnitialized: false
};

appStart.use(session(sess));
appStart.use(bodyParser.json());

appStart.use('/users', usersRouter);
appStart.use('/reimbursements', reimbursementRouter);
appStart.use('/login', loginRouter);

appStart.listen(3000);