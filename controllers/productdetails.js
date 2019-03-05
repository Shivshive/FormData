const express = require('express')
const bodyparser = require('body-parser')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const DomParser = require('dom-parser')
const pug = require('pug')
const savebymongoose = require('SaveDataByMongoose')
const schemadef = require('./schemadefinition')
const upload = multer()

router.use(bodyparser.json())
router.use(bodyparser.urlencoded({ extended: true }))

router.get('/', (req, res) => {
  res.render('productInfo', {
    title_: 'Product Details',
    cardheader: 'Thank you for filling this form !',
    cardtitle: 'Your data has been successfully saved !',
    cardtext: 'Please close this window.',
    // errors: {title:'Error Occured',description:'validation error'},
    errors : undefined
  })
})

router.post(
  '/addProductDetails',
  upload.none(),
  createDataObject,
  saveProductDetails,
  (req, res) => {}
)

function createDataObject (req, res, next) {
  let productObj = {}

  productObj.provider = req.body.provider
  productObj.prodname = req.body.prodname
  productObj.releaseversion = req.body.releaseversion
  productObj.releasedate = req.body.releasedate
  productObj.appurl = req.body.appurl
  productObj.serivceurl = req.body.serivceurl
  productObj.gitbranch = req.body.gitbranch

  req.productObj = productObj
  next()
}

module.exports = router

function saveProductDetails (req, res, next) {
  let connectionstring = 'mongodb://localhost/surround_products'
  savebymongoose
    .connect(connectionstring)
    .then(con => {
      console.log('Connection Established.. ')

      savebymongoose
        .compile(schemadef, 'release_Information', req.productObj)
        .then(cmodel => {
          console.log('model compiled..')

          savebymongoose
            .insert(cmodel)
            .then(result => {
              console.log('model inserted ..')
              req.result.status = result
              next()
            })
            .catch(e => {
              console.log(e)
              req.result.errors = e
              next()
            })
        })
        .catch(e => {
          console.log(e)
          req.result.errors = e
          next()
        })
    })
    .catch(e => {
      console.log(e)
      req.result.errors = e
      next()
    })
}
