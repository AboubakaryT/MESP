export default function App(){
  fetch("https://localhost:4000/users")
  .then(res=>res.json())
  .then(data =>console.log(data))
  return(
    
    <div>
      <div>
        <h1>Dashboard</h1>
        {console.log()}
      </div>
    </div>
  )
}