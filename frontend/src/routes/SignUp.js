import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate} from 'react-router-dom'
function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate=useNavigate();
  async function SignUp(e){
    e.preventDefault()
    const SignUpData = {
      email,
      password
    }
    try{
      const SignUpRes = await axios.post('http://localhost:5000/SignUp', SignUpData).then((res)=>{
        if(res.data.message==="YES"){
          alert("Email Already Exists");
        }
        else{
          console.log("SignUp Successful");
          navigate('/');
        }
      })
    }
    catch(e){
      console.log(e)
    }
  }
  return (
    <div>
      <h1>SignUp</h1>
      <form action="POST" className="post">
        <input type="email" onChange={(e)=>{
          setEmail(e.target.value)
        }} placeholder='Email'/>
        <input type="password" onChange={(e)=>{
          setPassword(e.target.value)
        }} placeholder='Password'/>
        <input type="submit" onClick={SignUp}/>
      </form>
    </div>
  )
}

export default SignUp