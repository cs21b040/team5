import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./routes/Home";
import Academic from './routes/Academic';
import Alumni from './routes/Alumni';
import Research from './routes/Research';
import SignUp from './routes/SignUp';
import Login from './routes/Login';           
import Profile from './routes/Profile';
import ProjectDetails from './routes/projectDetails';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
         <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/academic" element={<Academic />} />
          <Route path="/alumni" element={<Alumni />} /> 
          <Route path="/research" element={<Research />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/research/projectdetails" element={<ProjectDetails/>} />
        </Routes>
     </BrowserRouter>
  );
}

export default App;
