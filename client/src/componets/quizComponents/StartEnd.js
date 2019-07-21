import React from 'react';
import '../../App.css';
import Score from './Score';


export default function Option(props){
   return (
      <div>
         {props.isEnd ? 
         (
            <Score 
               correctScore={props.correctScore}
               incorrectScore={props.incorrectScore} />
         ) :  ""
         } 
         <button
            onClick={props.startGame}
            type="button"
            className="btn btn-primary btn-lg">
            {props.isEnd ? "Play Again" : "Start" }
         </button>
      </div>
   )
}