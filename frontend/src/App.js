import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./routes/Home";
import Academic from './routes/Academic';
import Alumni from './routes/Alumni';
import Research from './routes/Research';
function App() {
  return (
    <BrowserRouter>
         <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/academic" element={<Academic />} />
          <Route path="/alumni" element={<Alumni />} /> 
          <Route path="/research" element={<Research />} />
        </Routes>
     </BrowserRouter>
  );
}

export default App;
