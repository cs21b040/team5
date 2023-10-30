import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ChatState } from '../context/chatProvider';
import './Styles/research.css'

function Add_project() {
    const navigate = useNavigate();
    const {
        user,
    } = ChatState();
    async function onSubmit() {
        const titleValue = document.getElementById('form.1').value.toString();
        const professorValue = document.getElementById('form.2').value.toString();
        const instituteValue = document.getElementById('form.3').value.toString();
        const descriptionValue = document.getElementById('form.4').value.toString();
        const abstractValue = document.getElementById('form.5').value.toString();

        const projectDetails = {
            title: titleValue,
            professor: professorValue,
            institute: instituteValue,
            description: descriptionValue,
            abstract: abstractValue,
        };

        try {
            const response = await axios.post('http://localhost:5000/api/research/', projectDetails, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            if (response.status === 200) {
                document.getElementById('lightbox').style.display = "none";
                navigate('/Research');
            } else {
                console.log("Unexpected response status:", response.status);
            }
        } catch (err) {
            console.error("Error submitting the project:", err);
        }

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
                <Form.Group controlId="formFileMultiple" className="mb-3" style={{padding:'5px'}}>
                    <Form.Label>Upload the files relevant to the Project</Form.Label>
                    <Form.Control type="file" multiple />
                </Form.Group>
            </Form>
            <Button variant='primary' onClick={onSubmit}>Submit</Button>
        </div>
    );
}
export default Add_project;