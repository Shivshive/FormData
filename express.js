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

const upload = multer();

let express_run = (port) => {

    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({ extended: true }));
    app.use(express.static('public'));

    app.set('port', port);

    app.get('/whatsappgroup', (req, res) => {
        res.sendFile(path.join(__dirname, 'public/pages/index.html'));
    });

    app.post('/addmember', upload.none(), (req, res) => {

        let firstname = req.body.firstname;
        let wanumber = req.body.phonenumber;
        console.log('form data :: ', firstname, ' || ', wanumber);
        res.sendFile(path.join(__dirname, 'public','pages','ThankYou.html'));
    });

    app.listen(3000, () => {
        console.log(`Server has started on ${app.get('port')}`);
        // console.log('Below is the service URL');
        // console.log(`http://${os.hostname}:${app.get('port')}//whatsappgroup`);
    });
}

module.exports = express_run;