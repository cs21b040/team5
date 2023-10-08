import React from 'react'
import './Styles/subDiscuss.css';
import Form from 'react-bootstrap/Form';
function SubDiscuss({ selectedSubject }) {
  return (
    <div className='discuss'>
        <div className="discuss__header">
            <h3>{selectedSubject ? selectedSubject : 'Subject Discussions'}</h3>
        </div>
        <div className='discuss_body'>
            
        </div>
        <div className='post_question__wrapper'>
          <Form className="post_question__form">
            <Form.Group className="mb-3" controlId="br" style={{ display: 'flex' }}>
                <Form.Control placeholder="Post your question" style={{ marginRight: '10px' }} />
                <button>POST</button>
            </Form.Group>
          </Form>
        </div>
    </div>
  )
}

export default SubDiscuss
