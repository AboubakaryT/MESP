import Navbar from "./components/Navbar"
import { useEffect, useState } from 'react';
export default function App(){
//Use Effect(function, [if this happens the function will run.])
  const [users , setUsers] = useState([]);

  useEffect(()=> {fetch("http://localhost:4000/api/users/name", {
    method: 'GET',
    headers: {
      'Content-Type' : 'application/json'
    },})
  .then(res=>{
    if (res.ok){
      return res.json();
    }
    else{
      console.log("not successful")
    }
  })
  .then(json =>setUsers(json))
}
)

  return(
    
    <div>
      <div>
        <Navbar/>
        <h1>Dashboard</h1>
        {users.map(user =>{return <pre>{JSON.stringify(user)}</pre>})}
      </div>
    </div>
  )
}