import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { Home, Login, Submit, Register,Problem, SubmitCode, CreateProblem , AllSubmision} from './views/index';
import Navbar from './components/Navbar'

import "./styles/global.css"

const App = () => {
  return (
    <div>
      <Navbar />
      <Router>
<<<<<<< HEAD
        <div>
          <nav>
            <Link to="/login" > Login </Link>
            <Link to="/register" > Register </Link>
            <Link to ="/allsubmision"> AllSubmision</Link>
          </nav>
        </div>
=======
>>>>>>> main
        <Routes>
        <Route exact path="/register" element = { <Register />} />
          <Route exact path="/home" element = { <Home />} />
          <Route exact path="/login" element={ <Login/> } />
          <Route exact path="/submit" element={ <Submit /> } />
<<<<<<< HEAD
          <Route exact path="/allsubmision" element={<AllSubmision />} />
=======
          <Route exact path="/admin/problem/create" element={ <CreateProblem /> } />
          <Route exact path="/problem/:problemId" element={<Problem />} />

>>>>>>> main
        </Routes>
      </Router>
    </div>
  );
}

export default App;
