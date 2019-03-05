let schemadef = {
  provider: {
    type: String,
    require: true,
    trim: true
  },
  prodname: {
    type: String,
    trim: true
  },
  releaseversion: {
    type: String,
    trim: true
  },
  releasedate: {
    type: Date,
    trim: true
  },
  appurl: {
    type: String,
    trim: true
  },
  serivceurl: {
    type: String,
    trim: true
  },
  gitbranch: {
    type: String,
    trim: true
  },
  dateinformationprovided:{
      type : Date,
      default : Date.now()
  }
}

module.exports = schemadef;