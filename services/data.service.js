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
  })
  let user = accountDetails;

  if (acno in user) {
    return {
      statusCode: 422,
      status: false,
      message: "User already exsist please login",
    };
  } else {
    user[acno] = {
      acno,
      username: uname,
      password: pswd,
      balance: 0,
    };
    return {
      statusCode: 200,
      status: true,
      message: "Succesfully Registered",
    };
  }
};
const login = (req, acno, pswd) =>{
  let user = accountDetails;
  if (acno in user) {
    if (pswd == user[acno]["password"]) {
      req.session.currentUser = user[acno]
      return {
        statusCode: 200,
        status: true,
        message: "Succesfully log In"
      }
    } else {
      return {
        statusCode: 422,
        status: false,
        message: "Invalid Password"
      }
    }
  } else {
    return {
      statusCode: 422,
      status: false,
      message: "Invalid account number"
    } 
  }
}
const deposit = (accno, pswd, amt) => {

  var amount = parseInt(amt);
  let user = accountDetails;
  if (accno in user) {
    if (pswd == user[accno]["password"]) {
      user[accno]["balance"] += amount;
      return {
        statusCode: 200,
        status: true,
        balance: user[accno]["balance"],
        message:
          amount + " credited and new balance is" + user[accno]["balance"],
      };
    } else {
      return {
        statusCode: 422,
        status: false,
        message: "incorrect password",
      };
    }
  } else {
    return {
      statusCode: 422,
      status: false,
      message: "Invalid account ",
    };
  }
};

const withdrwal = (accno, pswd, amt)=>{

  var amount = parseInt(amt);
  let user = accountDetails;
  if (accno in user) {
    if (pswd == user[accno]["password"]) {
      if (user[accno]["balance"] > amount) {
        user[accno]["balance"] -= amount;

        return {
          statusCode: 200,
          status: true,
          balance: user[accno]["balance"],
          message:
            amount + " withdrawed  and new balance is" + user[accno]["balance"],
        };
      } else {
        return {
          statusCode: 422,
          status: false,
          message: "insufficient balance ",
        };
      }
    } else {
      return {
        statusCode: 422,
        status: false,
        message: "incorrect password ",
      };
    }
  } else {
    return {
      statusCode: 422,
      status: false,
      message: "invalid account ",
    };
  }
};

module.exports = {
  register,
  login,
  deposit,
  withdrwal,
};
