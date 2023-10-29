import React from 'react'
import './Styles/subDiscuss.css';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import Axios from 'axios';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function SubDiscuss({branch ,selectedSubject }) {
  const [question, setQuestion] = useState('');
  const [questions, setQuestions] = useState([]);
  
  const fetchQuestions = async () => {
    try {
      const response = await Axios.get('http://localhost:5000/api/academics/subjects/questions', {
        params: {
          branchName: branch,
          subjectName: selectedSubject,
        },
      }); 
      setQuestions(response.data);
    } catch (error) {
      console.error('Error occurred while fetching questions', error);
    }
  }
  useEffect(() => {fetchQuestions();},[selectedSubject]);


  const handlePostQuestion = async () => {
    try {
        const response = await Axios.post('http://localhost:5000/api/academics/subjects/questions', {
        branchName: branch,
        subjectName: selectedSubject,
        question: question,
      });

      if (response.status === 200) {
        console.log('Question posted successfully');
        const newQuestion = { question: question, answers: [] };
        setQuestions([...questions, newQuestion]);
        document.getElementById('br').value= '';
        setQuestion('');

      } else {
        console.error('Failed to post question');
      }
    } catch (error) {
      console.error('Error occurred while posting question', error);
    }
    
  };
  return (
    <div className='discuss'>
        <div className="discuss__header">
            <h3>{selectedSubject ? selectedSubject : 'Subject Discussions'}</h3>
        </div>
        <div className='discuss_body'>
            {questions.map((question,key) => (
                <div className='discuss_question' key={key}>
                    <Link
                      to={{
                          pathname: `/answers/${question._id}`,
                          search: `?branch=${branch}&selectedSubject=${selectedSubject}`,}}>
                      <h5>{question.question}</h5>
                    </Link>
                </div>
            ))}
        </div>
        <div className='post_question__wrapper'>
          <Form className="post_question__form">
            <Form.Group className="mb-3" controlId="br" style={{ display: 'flex' }}>
                <Form.Control 
                    placeholder="Post your question" 
                    style={{ marginRight: '10px' }} 
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handlePostQuestion();
                      }
                    }}
                />
                <button type="button" onClick={handlePostQuestion}>POST</button>
            </Form.Group>
          </Form>
        </div>
    </div>
  )
}

export default SubDiscuss
