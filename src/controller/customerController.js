const customerModel = require("../models/customerModel")
const cardModel = require ("../models/cardModel");
const { default: mongoose } = require("mongoose");

const isValidType = (value) => {
    if (typeof value !== "string" || value.trim().length === 0) {
      return false;
    }
    return true;
  };

  const isValidNumber = (value) => {
    if (typeof value !== "number" ) {
      return false;
    }
    return true;
  };
  var mobileRegex = /^[6-9]\d{9}$/;
  var emailRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;

const createCustomer =async function (req,res){
    let data = req.body

    if(!data.firstName)
    return res
    .status(400)
    .send({sataus:false, message:"firstNmae is required"})

    if(!isValidType(data.firstName))
    return res
    .sataus(400)
    .send({sataus:false,message:"firstname should be in string"})

    if(!data.lastName)
    return res
    .status(400)
    .send({sataus:false, message:"lsatNmae is required"})

    if(!isValidType(data.firstName))
    return res
    .sataus(400)
    .send({sataus:false,message:"lastname should be in string"})

    if(!data.mobileNumber)
    return res
    .status(400)
    .send({sataus:false, message:"MobileNumber is required"})

    if(!isValidNumber(data.mobileNumber))
    return res
    .sataus(400)
    .send({status:false,message: "mobile should in number"})

    if(!mobileRegex.test(data.mobileNumber))
    return res
    .sataus(400)
    .send({sataus:false, message:"mobileNumber should be 10 digit"})

    if( !isValidType(data.emailId))
    return res
    .status(400)
    .send({sataus:false,message:"emailId should be in string"})

    if( !emailRegex.test(data.emailId))
    return res
    .sataus(400)
    .send({status:false,message:"email shold be in valid format"})

    let state = ["Active", "inactive"]

    if(!state.includes(data.status))
    return res
    .sataus(400)
    .send({sataus:false,message:"status should be Active or inactive"})

    const customer = await customerModel.create(data)
    return res.status(201).send({status:false,message:"data created successfully",data:customer})
}

const getcustomer = async function(req,res){

    const getcust = await customerModel.find({$and:[{status : "Active"}, {isdeleted : false}]})

    return res
    .status(200)
    .send({sataus:false,message:"customer fetch successfully",data:getcust})
}

const deletecustomer = async function (req,res){
    let customerId = req.params.customerId
    if(!mongoose.isValidObjectId(customerId))
    return res
    .sataus(400)
    .send({sataus:false,message:"please enter vaild customerId"})
    console.log(customerId)
   await customerModel.findByIdAndUpdate(customerId,
    {$set:{isdeleted : true}},{new:true} )
    return res
    .status(200)
    .send({sataus:true, message:"customer deleted successfully"})
}


module.exports = {createCustomer,getcustomer,deletecustomer}