import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"

import Home from "./componets/Home"
import Create from "./componets/Create"
import Quiz from "./componets/Quiz"
import Header from  "./componets/Header"


function App() {
  return (
    <div>

      <div className="container">
        <Router>
          <Header />
          <Route exact path="/" component={Home} />
          <Route path="/create" component={Create} />
          <Route path="/quiz/:id" component={Quiz} />
        </Router>
        
      </div>
    </div>

  );
}

export default App;
