import React from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BranchSelect() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [branch, setBranch] = useState("");
  const navigate = useNavigate();

  function fun(e){
    setBranch(e.target.innerHTML);
    handleClose();
    const x=e.target.innerHTML;
    navigate(`/Academic/${x}`);
  }
  return (
    <div>
      <button variant="primary" onClick={handleShow} style={{backgroundColor: '#212529', margin: '0', border: '0', color:'#ffffff8c'}}>Academics</button>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>ACADEMICS</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <ul style={{listStyle:'none'}}>
                <li style={{padding:10}}><h6 style={{textDecoration: 'none',color:'#3B4045'}} onClick={fun}>Computer Science and Engineering</h6></li>
                <li style={{padding:10}}><h6 style={{textDecoration: 'none',color:'#3B4045'}} onClick={fun}>Electrical Engineering</h6></li>
                <li style={{padding:10}}><h6 style={{textDecoration: 'none',color:'#3B4045'}} onClick={fun}>Civil Engineering</h6></li>
                <li style={{padding:10}}><h6 style={{textDecoration: 'none',color:'#3B4045'}} onClick={fun}>Mechanical Engineering</h6></li>
                <li style={{padding:10}}><h6 style={{textDecoration: 'none',color:'#3B4045'}} onClick={fun}>Chemical Engineering</h6></li>
                <li style={{padding:10}}><h6 style={{textDecoration: 'none',color:'#3B4045'}} onClick={fun}>Aerospace Engineering</h6></li>
            </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}

export default BranchSelect
