const fp = require('find-free-port');

let freePort = ()=>{
    return new Promise((resolve, reject)=>{
        fp(3000, 3100, function(err, freePort){
            resolve(freePort);
        });
    })
}

module.exports = freePort;