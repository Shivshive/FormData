/**
 * This is the express nodejs module which acts as a middleware and exported to be used in other node functionalities..
 */

const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const app = express();
const multer = require('multer');
const fp = require('find-free-port');
const os = require('os');
const userdetails = require('./userdetails.js');
const productdetails = require('./productdetails.js')
const pug = require('pug')

const upload = multer();

let express_run = (port) => {

    app.set('port', port);

    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({ extended: true }));
    app.use(express.static('public'));
    app.set('view engine','pug');
    app.set("views", "./views");
    app.use('/userdetails',userdetails);
    app.use('/productdetails',productdetails);
    
    app.listen(app.get('port'), () => {
        console.log(`Server has started on ${app.get('port')}`);
        // console.log('Below is the service URL');
        // console.log(`http://${os.hostname}:${app.get('port')}//whatsappgroup`);
    });
}

module.exports = express_run;