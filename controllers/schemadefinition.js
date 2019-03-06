let schemadef = {
  provider: {
    type: String,
    require: true,
    trim: true,
    validate : {
      validator : (value)=>{
        return value!= "" && value !=" "
      },message : "Information Provider cannot be blank"
    }
  },
  prodname: {
    type: String,
    trim: true,
    validate : {
      validator : (value)=>{
        return value!= "" && value !=" "
      },message : "Product Name cannot be blank"
    }
  },
  releaseversion: {
    type: String,
    trim: true,
    validate : {
      validator : (value)=>{
        return value!= "" && value !=" "
      },message : "Release Version cannot be blank"
    }
  },
  releasedate: {
    type: String,
    trim: true
  },
  appurl: {
    type: String,
    trim: true
  },
  serivceurl: {
    type: String,
    trim: true,
    validate : {
      validator : (value)=>{
        return value!= "" && value !=" "
      },message : "Service URL cannot be blank"
    }
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