const express = require('express')
const app = express()
const port = 3000

let dbUsers = [ {
    username: "ali" ,
    password: "password",
    name:"ali",
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

app.get('/', (req, res) => {
  let data = req.body
  res.send(login(data.username,data.password))
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/',(req,res) => {
  let data = req.body
  res.send('post request'+ JSON.stringify(data))  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
