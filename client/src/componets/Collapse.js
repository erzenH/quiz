import React from 'react';

function App(props) {
  return (
    <div className="card">
      <div className="card-header" id={"heading"+props.id}>
        <h5 className="mb-0">
          <button 
            className="btn btn-link collapsed" 
            type="button" 
            data-toggle="collapse" 
            data-target={"#collapse"+props.id}
            aria-expanded="false" 
            aria-controls="collapseThree">
            {props.question}
          </button>
        </h5>
      </div>
      <div 
        id={"collapse"+props.id} 
        className="collapse" 
        aria-labelledby={"heading"+props.id} 
        data-parent="#accordionExample">
        <div className="card-body">
          A) {props.a}<br/>
          B) {props.b}<br/>
          C) {props.c}<br/>
          D) {props.d}<br/>
          True option: {props.true}
        </div>
      </div>
    </div>
  );
}

export default App;
