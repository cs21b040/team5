import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatState } from '../context/chatProvider';
import './Styles/research.css'

function Add_project() {
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const [image,setImage]=useState();
    const {
        user,
    } = ChatState();
    const [selectedFile, setSelectedFile] = React.useState(null);
    const postDetails=(image)=>{
        // setLoading(true);
        if(image===undefined){
          alert("Please Select an Valid Image");
          return;
        }
        if(image.type==="image/jpeg" || image.type==="image/png"){
          const data=new FormData();
          data.append("file",image);
          data.append("upload_preset","chating");
          data.append("cloud_name","dq7oyedtj");
          fetch("https://api.cloudinary.com/v1_1/dq7oyedtj/image/upload",{
            method:"post",
            body:data
          }).then(res=>res.json())
          .then(data=>{
            setImage(data.url.toString());
            // setLoading(false);
          })
          .catch((error)=>{
            console.log(error);
            // setLoading(false);
          })
        }
        else{
          alert("Please Select an Valid jpeg or png Image");
          return;
        }
      
      }
    async function onSubmit() {
        // console.log(document.getElementById('formFile2').value.toString());
        const titleValue = document.getElementById('form.1').value.toString();
        const professorValue = document.getElementById('form.2').value.toString();
        const instituteValue = document.getElementById('form.3').value.toString();
        const descriptionValue = document.getElementById('form.4').value.toString();
        const abstractValue = document.getElementById('form.5').value.toString();
        const picValue=image;
        if(!titleValue || !professorValue || !instituteValue || !descriptionValue || !abstractValue) {
            alert('Please fill all the fields');
        }

        const formData=new FormData();
        formData.append('file',selectedFile);
        formData.append('title',titleValue);
        formData.append('professor',professorValue);
        formData.append('institute',instituteValue);
        formData.append('description',descriptionValue);
        formData.append('abstract',abstractValue);
        formData.append('pic',picValue);
        console.log(formData);
        
        axios.post('http://localhost:5000/api/research/', formData, {
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            console.log(response);
            document.getElementById('lightbox').style.display = "none";
            navigate('/Research');
        }).catch((error) => {
            console.log(error);
        });

        document.getElementById('form.1').value = '';
        document.getElementById('form.2').value = '';
        document.getElementById('form.3').value = '';
        document.getElementById('form.4').value = '';
        document.getElementById('form.5').value = '';

    }


    return (
        <div className='content mx-2 my-2' style={{ height: '80%', overflowY: 'scroll' }}>
            <Form>
                <Form.Group className="mb-3" controlId="form.1">
                    <Form.Label>Title of the project</Form.Label>
                    <Form.Control placeholder="Title" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="form.2">
                    <Form.Label>Name of the professor</Form.Label>
                    <Form.Control placeholder="Professor's Name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="form.3">
                    <Form.Label>Institute</Form.Label>
                    <Form.Control placeholder="Institute" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="form.4">
                    <Form.Label>Short Description of the Project</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Description" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="form.5">
                    <Form.Label>Abstract</Form.Label>
                    <Form.Control as="textarea" rows={10} placeholder="Abstract" />
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3" style={{ padding: '5px' }} onChange={(e) => setSelectedFile(e.target.files[0])}>
                    <Form.Label>Upload the file relevant to the Project (Optional)</Form.Label>
                    <Form.Control type="file" multiple />
                </Form.Group>
                <Form.Group controlId="formFile2" className="mb-3" style={{ padding: '5px' }}>
                    <Form.Label>Display Image of the Project (Optional)</Form.Label>
                    <Form.Control type="file" accept="image/*" multiple onChange={
                        (e)=>{
                            const file = e.target.files[0];
                                 setSelectedImage(file);
                                 postDetails(file);
                        }
                    } />
                </Form.Group>
            </Form>
            <Button variant='primary' onClick={onSubmit}>Submit</Button>
        </div>
    );
}
export default Add_project;