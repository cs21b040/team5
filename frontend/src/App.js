import './App.css';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./routes/Home";
import Academic from './routes/Academic';
import Alumni from './routes/Alumni';
import Research from './routes/Research';
import SignUp from './routes/SignUp';
import Login from './routes/Login';           
import Profile from './routes/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import ChatContext from './context/chatProvider';
import PersonalChat from './routes/personalChat';
import ProjectDetails from './routes/projectDetails';
function App() {
  // DO LATER :::Wrap the ChatContext component in a Router component
  return (
    <Router>
      <ChatContext>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/academic/:branch" element={<Academic />} />
          <Route path="/alumni" element={<Alumni />} /> 
          <Route path="/research" element={<Research />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/personalchat" element={<PersonalChat/>} />
          <Route path="/research/projectDetails" element={<ProjectDetails />} />
        </Routes>
      </ChatContext>
    </Router>
  );
}

export default App;
