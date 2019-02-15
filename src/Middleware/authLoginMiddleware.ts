
export function userIsLoggedIn(req, res, next) {
    //console.log("userIsLoggedIn");
    //console.log(req);
    if(req.session.user){
        next();
    } else {
        console.log("sending 401? from userloggedin");
        res.status(401);
        res.send('You need to login')
    }
}

export function checkIfUserIsTheRequiredRole(req, res, next) {
/*     console.log(req.session.user);
    console.log(req.session.user.role); */
    console.log("UserIsRequiredRole");
    if(req.session.user){
        console.log(req.session.user.userid);
        console.log("This is the req.params" +req.params.userid);
        if(req.session.user.role === 1 || req.session.user.role === 2 || req.session.user.userid === +req.params.userid){
            next();
        }else {
            console.log('this is first else')
            res.sendStatus(401);
        }
    } else {
        console.log('this is second else')
        res.sendStatus(401);
    }
}
export function checkIfUserIsFinanceManagerOrAdmin(req, res, next) {
    if(req.session.user){
        if(req.session.user.role === 1 || req.session.user.role === 2){
            console.log("Check If User is...");
            next();
        }else {
            console.log("Check if user is...failed");
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);
    }
}
export function checkIfUserIsAdmin(req, res, next) {

    if(req.session.user){
        if(req.session.user.role === 1){
            next();
        }else {
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);
    }
    
}