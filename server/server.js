const express = require('express');
const bodyParse = require("body-parser");
const app = express();
app.use(bodyParse.json())
const port = 4000

const users = [
    { name: "ricky",
      id: 1,
      age:"22"
},
    { name: "phil",
    id:2,
    age:"30"
}
]

app.get("/", (req, res)=>{  
    res.send("hello world")
});

app.get("/api/users",(req,res)=>{
    res.send(users);
})

app.get("/api/users/:id", (req, res)=>{
    const id = Number(req.params.id);
    const findUser = users.find(user => user.id === id)
        res.send(findUser);
        if(findUser === undefined){
            res.status(404).send("user not found.")
        }
   
});

//Appending to array of object
//Patch updates a specific object in the array
app.put("/api/users/:id", (req,res)=>{
    const userId = parseInt(req.params.id)
    const {name, age} = req.body;
    
    const user = users.find(user => user.id === userId);

    if(user){
        user.name = name;
        user.age = age;
        res.send(user);
    }
    else{
        res.status(404).send("user not found")
    }
})


app.listen(port,()=>{
    console.log(`Server is up and running port ${port}`)
})