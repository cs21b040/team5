import React,{useState,useEffect} from 'react'
import './Styles/sideBar.css'
import {FaPlus,FaTimes} from 'react-icons/fa'
import {BiLeftArrowAlt} from 'react-icons/bi'
import axios from 'axios'
import {ChatState} from '../context/chatProvider'
function SideBar() {
  const {
    user,
    selectedGroup,
    setSelectedGroup,
  } = ChatState ();
  const [Interest,setInterest]=useState(false);
  const [data,setData]=useState([]);
  const [groupChatName,setGroupChatName]=useState("hello");
  const [newGroup,setNewGroup]=useState();
  const getData =async ()=>{
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      const {data}=await axios.get('http://localhost:5000/api/chat/group',config);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
  const addGroup=async ()=>{
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      const {data}=await axios.post('http://localhost:5000/api/chat/group',{name:newGroup},config);
    } catch (error) {
      console.log(error.message);
    }
  }
  const removeGroup=async ()=>{
  }
  useEffect(() => {
    if(!user) return;
    getData().then((data)=>{
      setData(data);
    }).catch((error) => {
      console.error('Error fetching data:', error);
    });
  }, [addGroup,removeGroup])
  
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
            <input type="text" className='Interest'onChange={
              (e)=>{
                setNewGroup(e.target.value);
              }
            }
            />
            </div>
            <div id="plus">
            <FaPlus size={15} color='white'onClick={()=>{
              addGroup();
            }}
            style={{cursor:"pointer"}}/>
            </div>
            <div id="cross">
            <FaTimes size={15} color='white'/>
            </div>
          </div>
        </li>
        {
          data.map((val, key) => {
            return (
              <li key={key} className='row' onClick={()=>{
                setGroupChatName(val.chatName);
                setSelectedGroup(val);
                console.log(selectedGroup);
              }}>
                <div>{val.chatName}</div>
              </li>
            )})
        }

      </ul>
    </div>
  )
}

export default SideBar