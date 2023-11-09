
import React from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState,useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { ChatState } from '../context/chatProvider';
import { ToastContainer, toast } from 'react-toastify';

function BranchSelect() {
  const {
    user,
} = ChatState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [branch, setBranch] = useState("");
  const [branches, setBranches] = useState([]);
  const navigate = useNavigate();

  async function getBranches() {
    try {
      const response = await axios.get('http://localhost:5000/api/academics/',{
        headers: {
          Authorization: `Bearer ${user.token}`,
        }
      });
      if (response.status === 200) {
        setBranches(response.data);
      } else {
        console.log("Unexpected response status:", response.status);
      }
    } catch (err) {
      console.error("Error fetching branches:", err);
    }
  }

  useEffect(() => {
    if(!user) return;
    getBranches();
  },[user, branches]); 
  function fun(e){
    setBranch(e.target.innerHTML);
    handleClose();
    const x=e.target.innerHTML;
    navigate(`/Academic/${x}`);
  }
  const reqBranch=async ()=>{
    const br=document.getElementById('br').value.toString();
    const config={
      headers:{
        Authorization: `Bearer ${user.token}`,
      }
    };
    try {
      const data=await axios.post('http://localhost:5000/api/academicAdmin/',{
        user:user,
        Branch:br
      },config);
      if(!data) toast.error("Request not sent");
      else toast.success("Request sent");
    } catch (error) {
      
    }
  }
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="light"
      />
      <button variant="primary"  onClick={handleShow} style={{backgroundColor: 'transparent', margin: '0', border: '0',color:'white'}}>Academics</button>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>ACADEMICS</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <ul style={{listStyle:'none'}}>
            {branches.map((br, index) => (
              <li key={index} style={{ padding: '10px', border:'0'}}>
                <h6 style={{ textDecoration: 'none', color: '#3B4045', cursor: 'pointer' }} onClick={fun}>{br.name}</h6>
              </li>
            ))}
            </ul>
        </Offcanvas.Body>
        <div>
          <Form>
            <Form.Group className="mb-3" controlId="br">
                <Form.Control placeholder="Enter branch" />
                <button onClick={()=>{
                  reqBranch();
                }}>Request</button>
            </Form.Group>
          </Form>
        </div>
      </Offcanvas>
      
    </div>
  )
}

export default BranchSelect