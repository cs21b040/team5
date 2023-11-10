import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
import '../Components/Styles/QuestionAnswers.css';
function QuestionAnswers() {
  const { questionId } = useParams();
  const branch = new URLSearchParams(window.location.search).get('branch');
  const selectedSubject = new URLSearchParams(window.location.search).get('selectedSubject');
  const [answers, setAnswers] = useState([]);
  const [question, setQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');


  useEffect(() => {
    const fetchQuestionAndAnswers = async () => {
      try {
        const response = await Axios.get(`http://localhost:5000/api/academics/subjects/questions/answers`, {
          params: {
            branchName: branch,
            subjectName: selectedSubject,
            questionId: questionId,
          },
        });
        const { question, answers } = response.data;
        setQuestion(question);
        setAnswers(answers);
      } catch (error) {
        console.error('Error occurred while fetching answers', error);
      }
    };

    fetchQuestionAndAnswers();
  }, [questionId]);

  const func = async () => {
    const tem = await Axios.get(`http://localhost:5000/api/academics/sendMail`, {
      params: {
        userEmail: question.userEmail,
        questionId: questionId,
      },
    });
    console.log(tem);
  }
  const handlePostAnswer = async () => {
    try {
      const response = await Axios.post(`http://localhost:5000/api/academics/subjects/questions/answers`, {
        branchName: branch,
        subjectName: selectedSubject,
        questionId: questionId,
        answer: newAnswer,
      });
      if (response.status === 200) {
        console.log('Answer posted successfully');
        setAnswers([...answers, { answer: newAnswer }]);
        console.log(question.userEmail);
        setNewAnswer('');
        func();
      } else {
        console.error('Failed to post answer');
      }
    } catch (error) {
      console.error('Error occurred while posting answer', error);
    }
  };


  return (
    <div className='discuss'>
      <div className="discuss__header_question">
        <h3>{question.question}</h3>
      </div>
      <div className='discuss_body'>
        <h5>{answers.length}</h5>
        {answers.map((answer, key) => (
          <h6>{answer._id}</h6>,
          <div className="discuss_answer" key={key}>
            <p>{answer.answer}</p>
          </div>
        ))}
      </div>

      <div className='post_answer__wrapper'>
        <Form className="post_answer__form">
          <Form.Group controlId="answerForm" className="mb-3" style={{ display: 'flex' }}>
            <Form.Control
              type="text"
              placeholder="Your Answer"
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
            />
            <button type="button" onClick={handlePostAnswer}>Post Answer</button>
          </Form.Group>
        </Form>
      </div>
    </div>
  )
}

export default QuestionAnswers;
