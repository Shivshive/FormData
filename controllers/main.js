
const express = require('./express');
const findPort = require('./findport');

(async ()=>{
    let port = await findPort();
    await express(port);
})();