import React from 'react';
import '../../App.css';

export default function Option(props){
   return (
      <div className="question pb-1">
         <p>Question {props.currentQuestionNr} of {props.questionNumbers}</p>
         <h1>{props.question}</h1>
      </div>
   )
}