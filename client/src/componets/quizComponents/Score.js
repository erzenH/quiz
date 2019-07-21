import React from 'react';
import '../../App.css';

export default function Option(props){
   return (
      <div className="scoreArea">
         <div className="score">
         Correct: {props.correctScore} 
         </div>
         <div className="score">
         Inorrect: {props.incorrectScore}
         </div>
         <br style={{clear: 'both'}} />
      </div>
   )
}