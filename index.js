const express = require('express');     //import statement
const session= require('express-session');
const cors = require('cors');
const dataService =require('./services/data.service');
const app = express();

app.use(cors({
  origin:'http://localhost:4200',
  credentials:true
}))

app.use(session({
  secret:'randomsecurestring',
  resave:false,
  saveUninitialized:false
}));        // to make deposit work only when logged In 

app.use(express.json());

app.use((req,res,next)=>{
  console.log("Middleware");
  next(); 
})

const logMiddleware=(req,res,next)=>{
  console.log(req.body);
  next();
}
// app.use(logMiddleware);

const authMiddleware=(req,res,next)=>{
  if (!req.session.currentUser) {
    return res.json({
      statusCode: 401,
      status: false,
      message: "Please Log In "
    })
  }
  else{
    next();
  }
}


// GET   Read
app.get('/', (req, res) => {
  res.status(401).send("This is a get method");
});

// POST  Create
app.post('/', (req, res) => {
  res.send("This is a post method");
});

// POST  Create REGISTER
app.post('/register', (req,res)=>{
  // console.log(req.body);    commented because its given in global middleware
  dataService.register(req.body.uname,req.body.acno,req.body.pswd)
 .then(result=>{
  res.status(result.statusCode).json(result)
 })
});

// POST  Create  LOGIN
app.post('/login', (req,res)=>{

// console.log(req.body);    //commented because its given in global middleware

  dataService.login(req,req.body.acno,req.body.pswd)
  .then(result=>{
  res.status(result.statusCode).json(result)
})
});

// POST  Create  DEPOSIT
app.post('/deposit',authMiddleware, (req,res)=>{
  console.log(req.session.currentUser)

// console.log(req.body);    commented because its given in global middleware

  dataService.deposit(req.body.acno,req.body.pswd,req.body.amt)
  .then(result=>{
  res.status(result.statusCode).json(result)
  })
});

// POST  Create  WITHDRAWAL
app.post('/withdrwal',authMiddleware,(req,res)=>{

 // console.log(req.body);    commented because its given in global middleware

  dataService.withdrwal(req,req.body.acno,req.body.pswd,req.body.amount)
  .then(result=>{
  res.status(result.statusCode).json(result)
  })
});

// PUT   Update/Modify whole
app.put('/', (req, res) => {
  res.send("This is a put method");
});

// PATCH   Update/Modify Partially
app.patch('/', (req, res) => {
  res.send("This is a patch method");
});

// DELETE  Delete
app.delete('/', (req, res) => {
  res.send("This is a delete method");
});



// DELETE  ACCOUNT
app.delete('/deleteAccDetails/:acno',authMiddleware, (req, res) => {
  dataService.deleteAccDetails(res.params.acno)
  .then(result=>{
    res.status(result.statusCode).json(result)
  })
}) ;




app.listen(3000, () => {                     // setting which port to display output
  console.log("Server Started at port:3000");    
});      
