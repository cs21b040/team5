import React from 'react'
import './Styles/admin.css';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import {ChatState} from '../context/chatProvider';
import axios from 'axios';
export default function AdminUsers() {
    const {
      user,
    } = ChatState();
    const [name,setName]=useState('')
    const [searchData,setSearchData]=useState([])
    const handleSearch=async (name)=>{
      const config={
        headers:{
          "Authorization":`Bearer ${user.token}`,
          "Content-Type":"application/json"
        }
      }
      try {
        const {data} = await axios.get(
          `http://localhost:5000/api/user?search=${name}`,
          config
        );
        setSearchData (data);
        console.log (searchData);
        if (data.length === 0) {
          alert ('No user found!!!');
        }
      } catch (error) {
        console.log(error)
      }
    }
    const handleDelete=async (id)=>{
      const config={
        headers:{
          "Authorization":`Bearer ${user.token}`,
        }
      }
      try {
        const {data} = await axios.put(
          `http://localhost:5000/api/user/delete/${id}`,{},
          config
        );
        if (data) {
          alert ('User banned!!!');
        }
      } catch (error) {
        console.log(error)
      }
    }
    return (
      <div className='adminUser'>
        <div className="row">
          <div className="col-md-4 border-box">
            <h4>Requests</h4>
          </div>
          <div className="col-md-4 border-box" >
            <h4 >Ban users</h4>
            <input  
              style={{
                padding: '10px',
                fontSize: '16px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                marginBottom: '10px',
                width: '80%',
              }}
              onChange={(e) => {
                setName(e.target.value);
              }}
              onKeyDown={(e) => {
                if(e.key === 'Enter'){
                  handleSearch(name);
                }
              }}
            />
            <input 
              type="submit"
              style={{
                padding: '10px 20px',
                fontSize: '16px',
                borderRadius: '5px',
                border: 'none',
                backgroundColor: '#007BFF',
                color: 'white',
                cursor: 'pointer',
              }}
              onClick={() => {
                handleSearch(name);
              }}
            />
            {
              searchData.map((data)=>{
                return(
                  <div style={{
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    border: '1px solid #ccc', 
                    borderRadius: '5px', 
                    padding: '10px', 
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
                    backgroundColor: '#fff', 
                    marginTop: '10px',
                  }}>
                    <div>
                      <p style={{fontSize: '20px',  fontWeight: 'bold', marginBottom: '10px',}}>{data.name}</p>
                      <p style={{fontSize: '14px', color: '#555',}}>{data.email}</p>
                      <Button variant="danger" onClick={()=>{handleDelete(data._id)}}>Ban</Button>
                    </div>
                    <img 
                      src={data.pic} 
                      style={{
                        width: '100px', 
                        height: '100px', 
                        borderRadius: '50%', 
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                )
              })
            }
          </div>
          <div className="col-md-4 border-box">
            <h4>Application Info</h4>
          </div>
        </div>
      </div>
    )
  }