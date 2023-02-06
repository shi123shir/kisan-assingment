const mongoose = require("mongoose")
let ObjectId = mongoose.Types.ObjectId


const cardSchema = new mongoose.Schema({
    cardNumber :{
        
           type:Number ,
            default: 0,
    },
    cardType :{
        type:String,
        enum:["REGULAR","SPECIAL"]
    },

    customerName :{
        type:String
    },

    status :{
        type: String,
        enum :["ACTIVE","INACTIVE"] ,
        default : "ACTIVE"
    },
    vision :{
        type:String
    },
    customerId :{
        type:ObjectId,
        ref :"customer",
        required : true
    }

},{ timestamps: true })



module.exports = mongoose.model("card",cardSchema)