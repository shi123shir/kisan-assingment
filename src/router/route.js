const express = require("express")
const route = express.Router()

const {createCustomer,getcustomer,deletecustomer} = require("../controller/customerController")
const {createCard,getcard} = require("../controller/cardController")


route.post("/register",createCustomer)
route.get ("/getcustomer", getcustomer)
route.delete("/deletecustomer/:customerId", deletecustomer)
route.post("/card",createCard)
route.get("/getcard",getcard)






module.exports = route