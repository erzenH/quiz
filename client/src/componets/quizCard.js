import React from 'react';
import { Link } from "react-router-dom"

import "../App.css"

function App(props) {
  return (
      <div className="card mb-5">
         <div className="card-header">
           This quiz have <b>{props.quizLength}</b> questions
         </div>
         <div className="card-body">
            <h5 className="card-title"> {props.quizName}</h5>
            <p className="card-text"><span className="text">Creator:</span> <b>{props.creator}</b></p>
            <Link href="#" to={"quiz/"+props.id} className="btn btn-primary">Go to the quiz</Link>
         </div>
      </div>
  );
}

export default App;
