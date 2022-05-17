import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home, Login, Submit, Register,Problem, SubmitCode, AllSubmision} from './views/index';
import Navbar from './components/Navbar'


const App = () => {
  return (
    <div>
      <Navbar />
      <Router>
        <Routes>
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/submit" element={<Submit />} />
          <Route exact path="/submit/:problemId" element={<SubmitCode />} />
          <Route exact path="/problem/:problemId" element={<Problem />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
