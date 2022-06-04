import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  Home, Login, Submit, Register, Problem, SubmitCode,
  CreateProblem, AllSubmision, RecentUserSubmission,
  CreateContest, Contests, AllProblems,Blog,
  CreateBlog, Users, AllContests, Profile, AdminPanel
} from './views/index';
import Navbar from './components/Navbar'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

import "./styles/global.css"

const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#343a40',
      },
      secondary: {
        main: '#f6a600',
        contrastText: '#fafafa',
        light: '#0066ff',
      },
    }
  });
  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: "flex", flexDirection: 'column',height:'100%' }}>
        <Navbar />
        <Router>
          <Routes>
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/submit" element={<Submit />} />
            <Route exact path="/submit/:problemId" element={<SubmitCode />} />
            <Route exact path="/allsubmision" element={<AllSubmision />} />
            <Route exact path="/problem/:problemId" element={<Problem />} />
            <Route exact path="/recent/:userId" element={<RecentUserSubmission />} />
            <Route exact path="/contests/:contestId" element={<Contests />} />
            <Route exact path="/problems" element={<AllProblems />} />
            <Route exact path="/users" element={<Users />} />
            <Route exact path="/contests" element={<AllContests />} />
            <Route exact path="/user/:userId" element={<Profile />} />
            <Route exact path="/blog/:blogId" element={<Blog />} />
            {/* admin stuff */}
            <Route exact path="/admin" element={ <AdminPanel /> } />
            <Route exact path="/admin/problem/create" element={<CreateProblem />} />
            <Route exact path="/admin/contest/create" element={<CreateContest />} />
            <Route exact path="/admin/blog/create" element={<CreateBlog />} />

          </Routes>
        </Router>
      </div>
    </ThemeProvider >
  );
}

export default App;