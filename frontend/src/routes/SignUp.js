import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate} from 'react-router-dom'
import '../Components/Styles/signup.css'
function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cname, setCname] = useState('')
  const navigate=useNavigate();
  const onChangeValue = (event) => {
    console.log(event.target.value);
  };
  async function SignUp(e){
    e.preventDefault()
    const SignUpData = {
      name,
      email,
      password,
      cname
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
    <div className='box1'>
      <div className='container1'>
        <div className='first1'>
          <div className="header1">
            <div className="position1">Welcome,</div>
            <div className="position2">Sign Up to access the website</div>
          </div>
        </div>
        <div className='second1'>
          <div className="header2">
            <div className="position3">Sign Up</div>
          </div>
          <div className='inputs1'>
            <div className='input1'>
              <input type="name" onChange={(e)=>{setName(e.target.value)}} placeholder='Name' /> 
            </div>
            <div className='input1'>
              <input type="email" onChange={(e)=>{setEmail(e.target.value)}}placeholder='Email ID'/>
            </div>
            <div className='input1'>
              <input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder='Password'/>
            </div>
            <div className='input1'>
              <input type="cname" onChange={(e)=>{setCname(e.target.value)}} placeholder='College Name' /> 
            </div>
            <div className='input2' onChange={onChangeValue}>
              <div className='radio-button'>
                <input type="radio" /> Student
              </div>
              <div className='radio-button'>
                <input type="radio" /> Professor
              </div>
              <div className='radio-button'>
                <input type="radio" /> Alumni
              </div>
            </div>
            <div className='button1'>
              <input type="submit" value="Sign Up" onClick={SignUp} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp