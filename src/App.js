import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home, Login, Submit, CreateProblem } from './views/index';

import "./styles/global.css"

const App = () => {
  return (
    <div>
      <Router>
        <div>
          <nav>
            <Link to="/login" > Login </Link>
          </nav>
        </div>
        <Routes>
          <Route exact path="/home" element = { <Home />} />
          <Route exact path="/login" element={ <Login/> } />
          <Route exact path="/submit" element={ <Submit /> } />
          <Route exact path="/admin/problem/create" element={ <CreateProblem /> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
