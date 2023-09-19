import React from 'react'
import './Styles/sideBar.css'
import {FaPlus,FaTimes} from 'react-icons/fa'
import {BiLeftArrowAlt} from 'react-icons/bi'
const {sideBarData} = require('./sideBarData.js')
function SideBar() {
  const [temp,setTemp]=React.useState(false)
  return (
    //BiDotsVerticalRounded
    <div className='sideBar'>
      <ul className='sideBarList'>
        <li>
          <div className='row-split'>
            <div id='add' onClick={()=>{
              setTemp(!temp);
              console.log(temp);
            }}>
              Request interest
            </div>
            <div id='icon'>
              <BiLeftArrowAlt size={25}/>
            </div>
          </div>
        </li>
        <li className={temp ? "request" : "passive"}>
          <div className="request">
            <div id="inp">
            <input type="text" className='temp'/>
            </div>
            <div id="plus">
            <FaPlus size={15} color='white'/>
            </div>
            <div id="cross" onClick={()=>{
              setTemp(!temp);
              console.log(temp);
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
      </ul>
    </div>
  )
}

export default SideBar