const db =require('./db');
// let currentUser;
let accountDetails = {
  1000: {
    acno: 1000,
    username: "userone",
    password: "userone",
    balance: 50000,
  },
  1001: { acno: 1001, username: "usertwo", password: "usertwo", balance: 5000 },
  1002: {
    acno: 1002,
    username: "userthree",
    password: "userthree",
    balance: 10000,
  },
  1003: {
    acno: 1003,
    username: "userfour",
    password: "userfour",
    balance: 6000,
  },
};

const register = (uname, acno, pswd) => {
  return db.User.findOne({acno})
  .then(user=>{
    console.log(user);
    
    if (user) {
      return {
        statusCode: 422,
        status: false,
        message: "User already exsist please login",
      }
    } else {
      const newUser =new db.User({
        acno,
        username: uname,
        password: pswd,
        balance: 0
    
    })
    newUser.save();
      return {
        statusCode: 200,
        status: true,
        message: "Succesfully Registered",
      }
    }
  })

  }
  

  
const login = (req, acno, password) =>{
  var acno =parseInt(acno);
  return db.User.findOne({acno,password})
  .then(user=>{
    if (user) {
     
        req.session.currentUser = user;
        return {
          statusCode: 200,
          status: true,
          message: "Succesfully log In",
          name:user.username
        }
      } 
      else {
        return {
          statusCode: 422,
          status: false,
          message: "Invalid Credentials"
        } 
      }
    })
  }

const deposit = (acno, password, amt) => {

  var amt = parseInt(amt);
  return db.User.findOne({acno,password})
  .then(user=>{
    if(!user){
      return {
        statusCode: 422,
        status: false,
        message: "Invalid Credentials"
      } 
    }
 
      user.balance+=amt;
      user.save();
      return {
        statusCode: 200,
        status: true,
        balance: user.balance,
        message:amt +" credited and new balance is "+ user.balance
      }
    })
  }
   

 const withdrwal = (acno, password, amt)=>{

  var amt = parseInt(amt);
  return db.User.findOne({acno,password})
  .then(user=>{
    if(!user){
        return {
          statusCode: 422,
          status: false,       
          message: "Invalid Credentials"
      } 
    }
    if(req.session.currentUser!=acno){
      return {
        statusCode: 422,
        status: false,
        message: "Permission Denied "
      };
    }
    if(user.balance<amt){
      return {
                  statusCode: 422,
                  status: false,
                  message: "insufficient balance "
                };
    }
      user.balance-=amt;
      user.save();
      return {
        statusCode: 200,
        status: true,
        balance: user.balance,
        message:
          amt +" withdrawed and new balance is "+ user.balance
      }
    })
  }

  const deleteAccDetails=(acno)=>{
    return db.User.deleteOne({
      acno:acno
    }).then(user=>{
      if(!user){
        return{
          status: false,
          statusCode: 422,
          message: "Operation Failed "

        }
      }
      return{

        status: true,
        statusCode: 200,
        message: "Account Number"+ acno+"Deleted Succesfully ",

      }
    })
  }


 module.exports = {
  register,
  login,
  deposit,
  withdrwal,
  deleteAccDetails
 };

