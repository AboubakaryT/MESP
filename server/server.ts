import express, { type Express, type Request, type Response } from 'express';

const app : Express = express();
const cors = require('cors');
app.use(express.json());
const port = 4000;
//Allows my react frontend to contact my backend.
const corsOptions ={
    origin : 'http://localhost:5173'
}

app.use(cors(corsOptions));

    const users : {name: string, id: number, age: number}[] = [
    { name: "ricky",
      id: 1,
      age: 22
},
    { name: "phil",
    id:2,
    age: 30
}
]

//GET
app.get("/", (req : Request, res : Response)=>{  
    res.send("hello world");
});

app.get("/api/users",(req : Request,res : Response)=>{
    res.send(users);
})

app.get("/api/users/name", (req :Request, res, Response)=>{
    let userNames: string[] = [];
    for(let i = 0; i < users.length; i++){
        let user = Object.values(users)[i].name;
        userNames.push(user);
    }
    res.send(userNames)
})

app.get("/api/users/:id", (req : Request, res : Response)=>{
    const id = Number(req.params.id);
    const findUser = users.find(user => user.id === id);
        if(findUser === undefined){
            res.status(404).send("user not found.");
        }
        else{
            res.send(findUser);
        }
   
});

//Appending to array of object
//Patch updates a specific object in the array
app.put("/api/users/:id", (req : Request ,res :Response)=>{
    const userId = Number(req.params.id)
    const {name, age} = req.body;
    
    const user = users.find(user => user.id === userId);

    if(user){
        user.name = name;
        user.age = age;
        res.send(user);
    }
    else{
        res.status(404).send("user not found");
    }
})

//Post
app.post("/api/users",(req: Request, res :Response)=>{
    const newUser = {
        name: req.body.name,
        id: users.length + 1, 
        age: req.body.age,
    }
    users.push(newUser);
    res.send(users)
})

//Delete
app.delete("/api/users/:id", (req: Request, res: Response)=>{
    const userId = Number(req.params.id)
    //Index of user with given id
    const userFound = users.findIndex(user => user.id === userId);
    if(userFound != -1){
            const ret = users.splice(userFound, 1);
            res.send(ret);
    }
    else{
        res.status(404).send("user not found");
    }
})

app.listen(port,()=>{
    console.log(`Server is up and running port ${port}`);
})