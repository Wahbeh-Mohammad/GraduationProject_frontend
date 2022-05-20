import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home, Login, Submit, Register,Problem, SubmitCode, CreateProblem,RecentUserSubmission} from './views/index';
import Navbar from './components/Navbar'

import "./styles/global.css"

const App = () => {
  return (
    <div>
      <Navbar />
      <Router>
        <Routes>
        <Route exact path="/register" element = { <Register />} />
          <Route exact path="/home" element = { <Home />} />
          <Route exact path="/login" element={ <Login/> } />
          <Route exact path="/submit" element={ <Submit /> } />
          <Route exact path="/submit/:problemId" element={ <SubmitCode /> } />
          <Route exact path="/admin/problem/create" element={ <CreateProblem /> } />
          <Route exact path="/problem/:problemId" element={<Problem />} />
          <Route exact path="/recent/:userId" element={<RecentUserSubmission />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
