'use strict';
const base64 = require('base-64');
const users = require('./index.js');
module.exports=(req,res,next) => {
    if(!req.headers.authorization){ next('invalid login'); return;}
    let basic = req.headers.authorization.split(' ').pop();
    let [user,pass] = base64.decode(basic).split(':');
    users.authenticBasic(user,pass)
    .then(validUser=>{
        req.token=users.generateToken(validUser)
        next();
    }).catch(err=> next('invalid login'));
}