const mongooose =require("mongoose")

mongooose.connect('mongodb://localhost:27017/bankApp',{
    useNewUrlParser:true,
    useUnifiedTopology: true
})

const User=mongooose.model('user',{
    acno:Number,
    username:String,
    password:String,
    balance:Number
})
module.exports={
    User
}