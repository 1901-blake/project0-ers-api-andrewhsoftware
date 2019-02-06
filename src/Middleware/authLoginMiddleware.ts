
export function userIsLoggedIn(req, res, next) {
    if(req.session.user){
        next();
    } else {
        res.status(401);
        res.send('You need to login')
    }
}

export function checkIfUserIsTheRequiredRole(req, res, next) {
/*     console.log(req.session.user);
    console.log(req.session.user.role); */
    if(req.session.user){
        console.log(req.session.user.userid);
        if(req.session.user.role === 1 || req.session.user.role === 2 || req.session.user.userid === +req.params.id){
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
            next();
        }else {
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