import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home, Login, Submit, Register, Problem, SubmitCode, CreateProblem, AllSubmision, RecentUserSubmission, CreateContest, Contests ,Profile} from './views/index';
import Navbar from './components/Navbar'

import "./styles/global.css"

const App = () => {
  return (
    <div style={{display:"flex",flexDirection:'column', justifyContent:"center", alignItems:'center'}}>
      <Navbar />
      <Router>
        <Routes>
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/submit" element={<Submit />} />
          <Route exact path="/submit/:problemId" element={<SubmitCode />} />
          <Route exact path="/allsubmision" element={<AllSubmision />} />
          <Route exact path="/admin/problem/create" element={<CreateProblem />} />
          <Route exact path="/admin/contest/create" element={<CreateContest />} />
          <Route exact path="/problem/:problemId" element={<Problem />} />
          <Route exact path="/recent/:userId" element={<RecentUserSubmission />} />
          <Route exact path="/contests/:contestId" element={<Contests />} />
          <Route exact path="/problem/:contestId" element={<Contests />} />
          <Route exact path="/user/:userId" element={<Profile />} />
          <Route exact path="/submission/user/:userId" element={<Profile />} />


        </Routes>
      </Router>
    </div>
  );
}

export default App;
