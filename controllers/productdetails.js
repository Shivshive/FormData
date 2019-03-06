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
  let pageObject = {
    title_: 'Product Details',
    cardheader: 'Thank you for filling this form !',
    cardtitle: 'Your data has been successfully saved !',
    cardtext: 'Please close this window.',
    response: undefined
  }
  res.render('productInfo', { pageObject })
})

router.post(
  '/addProductDetails',
  upload.none(),
  createDataObject,
  saveProductDetails,
  (req, res) => {
    let pageObject = {
      title_: 'Product Details',
      cardheader: 'Thank you for filling this form !',
      cardtitle: 'Your data has been successfully saved !',
      response: undefined
    }

    if (req.result) {
      console.log(JSON.stringify(req.result, false, 3))
      pageObject.response = {
        result: {
          name: req.result.provider,
          id: req.result.id
        }
      }
      res.render('productInfo', pageObject)
    } else {
      console.log(savebymongoose.showErrors(req.errors));
      pageObject.response = {
        errors: { title: req.errors.name, description: savebymongoose.showErrors(req.errors)}
      }
      res.render('productInfo', pageObject)
    }
  }
)

function createDataObject (req, res, next) {
  let productObj = {}

  productObj.provider = req.body.providername
  productObj.prodname = req.body.productname
  productObj.releaseversion = req.body.releaseversion
  productObj.releasedate = req.body.releasedate
  productObj.appurl = req.body.appurl
  productObj.serivceurl = req.body.serivceurl
  productObj.gitbranch = req.body.gitbranch

  req.productObj = productObj

  next()
}

function saveProductDetails (req, res, next) {
  let connectionstring = 'mongodb://localhost/sp'

  savebymongoose
    .connect(connectionstring)
    .then(connection => {
      console.log('connection ready .. ')
      let document = savebymongoose.compile(
        schemadef,
        'ProductsDetails',
        req.productObj
      )
      savebymongoose
        .insert(document)
        .then(data => {
          console.log('document saved successfully')
          req.result = data
          savebymongoose.disconnect(connection)
          next()
        })
        .catch(e => {
          console.log('Unable to insert document due to below error')
          console.log(JSON.stringify(e,false, 3))
          req.errors = e
          savebymongoose.disconnect(connection)
          next()
        })
    })
    .catch(e => {
      console.log('Unable to establish connection due to below error')
      console.log(JSON.stringify(e, false, 3))
      req.errors = e
      next()
    })
}

module.exports = router
