import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home, Login, Submit, Register ,AllSubmision} from './views/index';


const App = () => {
  return (
    <div>
      <Router>
        <div>
          <nav>
            <Link to="/login" > Login </Link>
            <Link to="/register" > Register </Link>
            <Link to ="/allsubmision"> AllSubmision</Link>
          </nav>
        </div>
        <Routes>
        <Route exact path="/register" element = { <Register />} />
          <Route exact path="/home" element = { <Home />} />
          <Route exact path="/login" element={ <Login/> } />
          <Route exact path="/submit" element={ <Submit /> } />
          <Route exact path="/allsubmision" element={<AllSubmision />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
