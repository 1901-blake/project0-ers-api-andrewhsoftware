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
appStart.use((req, resp, next) => {
    (process.env.MOVIE_API_STAGE === 'prod')
      ? resp.header('Access-Control-Allow-Origin', process.env.DEMO_APP_URL)
      : resp.header('Access-Control-Allow-Origin', `http://localhost:5500`);
    resp.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    resp.header('Access-Control-Allow-Credentials', 'true');
    resp.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
   });
appStart.use('/users', usersRouter);
appStart.use('/reimbursements', reimbursementRouter);
appStart.use('/login', loginRouter);

appStart.listen(3000);