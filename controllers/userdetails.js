const express = require('express');
const bodyparser = require('body-parser');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const upload = multer();

router.use(bodyparser.json());
router.use(bodyparser.urlencoded({ extended: true }));
router.use(express.static('public'));

router.get('/whatsappgroup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/pages/index.html'))
})

router.post('/addmember', upload.none(), (req, res) => {
  let firstname = req.body.firstname
  let wanumber = req.body.phonenumber
  console.log('form data :: ', firstname, ' || ', wanumber)
  res.sendFile(path.join(__dirname, 'public', 'pages', 'ThankYou.html'))
})

module.exports = router;