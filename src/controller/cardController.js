const cardModel = require("../models/cardModel")
const customerModel = require("../models/customerModel")


const createCard = async function (req,res){
  try {
    const data = req.body
    const upd = await cardModel.find().count()
  
    data.cardNumber = upd + 1
     let match = ["REGULAR","SPECIAL"]
    if( !match.includes(data.cardType)) 
    return res
    .status(400)
    .send({status:false, message:"cardtype should be regular or special"})
   if(data.status){
    let state = ["ACTIVE","INACTIVE"]
    if( !state.includes(data.status)) 
    return res
    .status(400)
    .send({status:false, message:"status should be ACTIVE or INACTIVE"})
   }
  
   if(!data.customerId)
   return res
   .status(400)
   .send({status:false,message:"customerId is medatory"})
  
   const getname = await customerModel.findById(data.customerId)
   if(getname.isdeleted == true)
   return res
   .status(404)
   .send({status:false,message:"coutomer not found"})
  
      data.customerName = getname.firstName +" "+getname.lastName
     
  
    const card = await cardModel.create(data)
    res.status(201).send({status:true, data:card})
  } catch (err) {
    return res
    .status(500)
    .send({status:false,message:"server error",error:err.message})
  }

}


const getcard = async function (req, res){
  try {
    let allcard = await cardModel.find()
     console.log(allcard)
    // let customer = await customerModel.findOne({_id:allcard.customerId})
    // console.log(customer)
    // if(customer.isdeleted == true)
    // return res
    // .status(404)
    // .send({status:false,message:"customer not exist"})
    return res
    .status(200)
    .send({satus:true, message:"card bring successfully", data:allcard})

  } catch (err) {
    return res.status(500).send({status:false,message:"server error",error:err.message})
  }


}


module.exports = {createCard,getcard}