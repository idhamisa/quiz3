var jwt = require('jsonwebtoken')
const express = require('express')
const app = express()
const port = 300


let dbUsers = [ {
    username: "mirul" ,
    password: "1234",
    name:"mirul",
    email: "ali@utem.com"


},
{
    username: "johnny",
    password: "yespapa",
    name: "johnny johnny",
    email: "eatingsugar@nopapa.com"
}]

//enable json body parsing
app.use(express.json());

app.post('/' , (req, res) => {
  let data = req.body
  res.send(
    login(
      data.username,
      data.password
    )
  );
});

app.use(express.json());

app.post('/register' , (req, res) => {
  let data = req.body
  res.send(
    register(
      data.username,
      data.password,
      data.name,
      data.email
    )
  );
});

app.get('/hello' , (req, res) => {
  res.send('Hello World!')
  console.log(req,user)
})

app.get('/bye' , (req, res) => {
    res.send('Bye bye World!')
 })

app.post('/login2', (req, res) => {
   const { username, password } = req.body;
   const user = dbUsers.find(user => user.username === username && user.password === password);
   
   if (user) {
    res.send(user);
   } else {
    res.send({error: "User not found"});
   }
 }) 

 app.post('/login',(req,res) => {
  let data = req.body
  const user = login(data.username,data.password); 
  res.send(generateToken(user))
})

 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

function login(username, password){
  console.log("someone try to login with", username, password)
  let matched = dbUsers.find(element => 
      element.username == username
  )
  if(matched) {
      if(matched.password == password) {
          return matched
      } else {
          return "Password not matched"
      }
  } else {
      return "Username not found"
  } 
  
}

//to generate JWT token
function generateToken(userProfile){
return jwt.sign(
  userProfile,
 'secret', 
 { expiresIn: 60 * 60 });
}

//to verify JWT TOken
function verifyToken(req,res,next){
  let header = req.headers.authorization
  console.log(header)

  let token = header.split(' ')[1]

  jwt.verify(token,'secret',function(err,decode) {
    if(err){
      res.send("Invalid token")
    }
    console.log(decode) //bar

    next()
  });
}

function register(newusername, newpassword, newname, newemail) {
  //TODO: Check if username exist
  
  let matched = dbUsers.find(element => 
  element.username == newusername)
  if(matched){
      console.log("Username already exist")
  }else { console.log("push successfully")

  dbUsers.push({
      username : newusername,
      password: newpassword,
      name: newname,
      email: newemail
      
  })    }
  
  return "Register Succesfully"
}
  