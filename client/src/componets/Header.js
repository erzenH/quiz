import React from 'react';
import { Link } from "react-router-dom"

function App() {
  return (
    <div className="pb-3">
      <ul className="nav nav-tabs justify-content-center">
         <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
         </li>
         <li className="nav-item">
            <Link to="/create" className="nav-link">Create Quiz</Link>         
         </li>
      </ul>
    </div>
  );
}

export default App;
