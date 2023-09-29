import React,{useEffect} from 'react'
import './Styles/sideBar.css'
import {FaPlus,FaTimes} from 'react-icons/fa'
import {BiLeftArrowAlt} from 'react-icons/bi'
const {sideBarData} = require('./sideBarData.js')
function SideBar() {
  const [Interest,setInterest]=React.useState(false)
  const [single,setSingle]=React.useState(false)
  // useEffect(() => {
  //   //change
  // }, [single])
  
  return (
    <div className='sideBar'>
      <ul className='sideBarList'>
        <li>
          <div className='row-split'>
            <div id='add' onClick={()=>{
              setInterest(!Interest);
              console.log(Interest);
            }}>
              Request interest
            </div>
            <div id='icon'>
              <BiLeftArrowAlt size={25}/>
            </div>
          </div>
        </li>
        <li className={Interest ? "request" : "passive"}>
          <div className="request">
            <div id="inp">
            <input type="text" className='Interest'/>
            </div>
            <div id="plus">
            <FaPlus size={15} color='white'/>
            </div>
            <div id="cross" onClick={()=>{
              setInterest(!Interest);
              console.log(Interest);
            }}>
            <FaTimes size={15} color='white'/>
            </div>
          </div>
        </li>
        {sideBarData.map((val, key) => {
          return (
            <li key={key} className='row' 
            id={window.location.pathname === val.link ? "active" : ""}
            onClick={()=>{
              window.location.pathname=val.link}
              }>
              <div>{val.title}</div>
            </li>
          )})}
        <li className='row'>
              {single ?<div onClick={()=>{setSingle(!single);}}>Chat's</div>
              :<div onClick={()=>{setSingle(!single);}}>Interest</div>}
        </li>
      </ul>
    </div>
  )
}

export default SideBar