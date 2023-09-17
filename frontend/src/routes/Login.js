import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate} from 'react-router-dom'
function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate=useNavigate();
  async function login(e){
    e.preventDefault()
    const loginData = {
      email,
      password
    }
    try{
      await axios.post('http://localhost:5000/login', loginData)
      .then((res)=>{
        if(res.data.message==="YES"){
          //TODO: .message
          console.log("Login Successful");
          navigate('/');
        }
        else{
          console.log("Email Doesn't Exist");
        }
      })
    }
    catch(e){
      console.log(e)
    }
  }
  return (
    <div>
      <h1>Hello</h1>
      <form action="POST" className="post">
        <input type="email" onChange={(e)=>{
          setEmail(e.target.value)
        }} placeholder='Email'/>
        <input type="password" onChange={(e)=>{
          setPassword(e.target.value)
        }} placeholder='Password'/>
        <input type="submit" onClick={login}/>
      </form>
    </div>
  )
}

export default Login
