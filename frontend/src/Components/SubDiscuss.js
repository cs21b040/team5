import React from 'react'
import './Styles/subDiscuss.css';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import Axios from 'axios';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChatState } from '../context/chatProvider';
import { FiPlusSquare } from 'react-icons/fi';
import Dropdown from 'react-bootstrap/Dropdown';
import { BiCloudUpload } from 'react-icons/bi';
import { CgSoftwareDownload } from 'react-icons/cg';
import CloseButton from 'react-bootstrap/CloseButton';

function SubDiscuss({ branch, selectedSubject }) {
  const [question, setQuestion] = useState('');
  const [questions, setQuestions] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);


  async function onSubmit() {
    if (!selectedFile) {
      alert("Please select a file");
      console.log("Please select a file");
      return;
    }
    const formData = new FormData();
    formData.append('branchName', branch);
    formData.append('subjectName', selectedSubject);
    formData.append('postedBy', user.name);
    formData.append('file', selectedFile);
    try {
      const resp = await Axios.post('http://localhost:5000/api/academics/subjects/questions', formData)
      document.getElementById("lightbox3").style.display = "none";
      setQuestions([...questions, resp.data]);
    }
    catch (err) {
      console.error(err);
    }
  };


  const downloadFile = async (buffer) => {
    console.log(buffer)
    try {
      const { data } = await Axios.get(`http://localhost:5000/api/academics/subjects/question`, {
        params: {
          branchName: branch,
          subjectName: selectedSubject,
          questionId: buffer._id,
        },
      });
      const fileURL = "/" + data.status;
      let alink = document.createElement("a");
      alink.href = fileURL;
      alink.download = data.status;
      alink.click();
    } catch (error) {
      console.error(error);
    }
  }

  const {
    user
  } = ChatState();
  const [questionsFetched, setQuestionsFetched] = useState(false);

  function upload() {
    document.getElementById("lightbox3").style.display = "block";
  }

  const fetchQuestions = async () => {
    try {

      const response = await Axios.get('http://localhost:5000/api/academics/subjects/questions', {
        params: {
          branchName: branch,
          subjectName: selectedSubject,
        },
      });
      if (Array.isArray(response.data) && response.data.length > 0) {
        setQuestionsFetched(true);
        setQuestions(response.data);
      }
      else {
        setQuestionsFetched(false);
      }
      setQuestions(response.data);
    } catch (error) {
      console.error('Error occurred while fetching questions', error);
    }
  }
  useEffect(() => { fetchQuestions(); }, [selectedSubject]);


  const handlePostQuestion = async () => {
    try {
      const response = await Axios.post('http://localhost:5000/api/academics/subjects/questions', {
        postedBy: user.name,
        userEmail: user.email,
        branchName: branch,
        subjectName: selectedSubject,
        question: question,
      });

      if (response.status === 200) {
        console.log('Question posted successfully');
        setQuestions([...questions, response.data]);
        document.getElementById('br').value = '';
        setQuestion('');
        setQuestionsFetched(true);

      } else {
        console.error('Failed to post question');
      }
    } catch (error) {
      console.error('Error occurred while posting question', error);
    }

  };
  return (
    <div className={`discuss ${questionsFetched ? ' background-image-hidden' : ''}`}>
      <div className="discuss__header">
        <h3>{selectedSubject ? selectedSubject : 'Subject Discussions'}</h3>
      </div>
      <div className='discuss_body'>
        {questions.map((question, key) => (
          <div className='discuss_question' key={key}>
            {/* <h6>{question._id}</h6> */}
            <Link
              to={{
                pathname: `/answers/${question._id}`,
                search: `?branch=${branch}&selectedSubject=${selectedSubject}`,
              }}
              className='custom-link'>
              <p>Posted By: <b>{question.PostedBy}</b></p>
              <h5>{question.question}</h5>
            </Link>
            <p>{question.file && <CgSoftwareDownload style={{ marginLeft: "1rem", marginRight: "0.5rem", marginTop: "10px", marginBottom: "10px" }} size={25}
              onClick={() => { downloadFile(question) }} />}
            </p>
          </div>
        ))}
      </div>
      <div id='lightbox3'>
        <CloseButton
          className='close2'
          onClick={() => {
            document.getElementById("lightbox3").style.display = "none";
          }}
        />
        <div className='content'>
          <BiCloudUpload size={80} color='black' />
          <form>
            <input
              type="file"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
          </form>
          <button className='btn btn-primary' onClick={onSubmit}>Submit</button>
        </div>
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
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <FiPlusSquare size={25} color={"white"} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => {
                  upload();
                }}>Insert File</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <button type="button" onClick={handlePostQuestion}>POST</button>
          </Form.Group>
        </Form>
      </div>
    </div>
  )
}

export default SubDiscuss
