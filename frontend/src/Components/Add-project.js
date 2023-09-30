import React from 'react';
import Form from 'react-bootstrap/Form';

function Add_project() {

    function onSubmit() {
        
    }

    return (
        <div>
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
                    <Form.Control placeholder="Description" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="form.5">
                    <Form.Label>Abstract</Form.Label>
                    <Form.Control placeholder="Abstract" />
                </Form.Group>

            </Form>
            <button className='btn btn-primary'>Submit</button>
        </div>
    );
}
export default Add_project;