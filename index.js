const express = require('express')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const fs = require('fs')

const app = express();

app.use(bodyParser.json())

const jwtSecretKey = "mysecretkey12345"


app.post("/login", (req, res) => { 
    console.log(req.body)
    let data = req.body;
    let readData = fs.readFileSync('db.txt','utf-8')
    readData = JSON.parse(readData)
    if(data.username == readData.username)
    {
        const token = jwt.sign(data, jwtSecretKey);
    
        res.send(token);
    }
    else {
        res.send('error')
    }
});

app.post("/validate", (req, res) => {
  
    try {
        const token = req.header('jwttoken')
  
        const verified = jwt.verify(token, jwtSecretKey);
        if(verified){
            return res.send("Successfully Verified");
        }else{
            return res.send("not verified");
        }
    } catch (error) {
        res.send("error");
    }
});
  
app.listen(3000, () => {
  console.log(`Server is running`);
});
