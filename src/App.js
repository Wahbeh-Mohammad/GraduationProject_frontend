import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home, Login, Submit } from './views/index';


const App = () => {
  return (
    <div>
      <Router>
        <Home />
        <div>
          <nav>
            <Link to="/" > Home </Link>
            <Link to="/login" > Login </Link>
            <Link to="/submit" > Submit </Link>
          </nav>
        </div>
        <Routes>
          <Route exact path="/login" element={ <Login/> } />
          <Route exact path="/submit" element={ <Submit /> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
