import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home, Login, Submit } from './views/index';


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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
