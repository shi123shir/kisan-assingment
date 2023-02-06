const mongoose = require ("mongoose")

const customerSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    mobileNumber:{
        type:Number,
        required : true
    },
    dob:{
        type:String,
        required: true
    },
    emailId :{
        type:String,
        required:true
    },
    address:{
        type:String,
    },
    status:{
        type:String,
        enum :["Active", "inactive"],
        required : true
    },
    isdeleted: {
        type : Boolean,
        default : false
    },
},{ timestamps: true })

module.exports = mongoose.model("customer", customerSchema)