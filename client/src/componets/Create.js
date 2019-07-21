import React from 'react';
import axios from 'axios';
import Collapse from './Collapse'
export default class Create extends React.Component {

  state = {
    creatorName: '',
    quizName: '',
    question: '',
    a: '',
    b: '',
    c: '',
    d: '',
    trueOption: '',
    toggleQuestion: false,
    questions: [],
    erorr: '',
    questionErorr:''
  }

  haveErorr = () => {
    const {question,a,b,c,d,trueOption} =  this.state;

    if(!question){
      this.setState({questionErorr: 'Question is not allowed to be empty'})
      return true
    }
    else if(!a){
      this.setState({questionErorr: 'A option is not allowed to be empty'})
      return true
    } 
    else if(!b){
      this.setState({questionErorr: 'B option is not allowed to be empty'})
      return true
    }
    else if(!c){
      this.setState({questionErorr: 'C option is not allowed to be empty'})
      return true
    } 
    else if(!d){
      this.setState({questionErorr: 'D option is not allowed to be empty'})
      return true
    } 
    else if(!trueOption){
      this.setState({questionErorr: 'Select true option'})
      return true
    }
    else return false   
  }

  getTrueOption = () => {
    const {a,b,c,d,trueOption} =  this.state;

    if(trueOption === 'a') return a
    else if(trueOption === 'b') return b
    else if(trueOption === 'c') return c
    else if(trueOption === 'd') return d
  }

  handleQuestion = () =>{
    const {question,a,b,c,d,questions} =  this.state;

    if(!this.haveErorr()){
      let questionObj = {
        question: question,
        a: a,
        b: b,
        c: c,
        d: d,
        true: this.getTrueOption()
      }
      
      questions.push(questionObj)

      this.setState({
        toggleQuestion: !this.state.toggleQuestion,
        question: '',
        a: '',
        b: '',
        c: '',
        d: '',
        trueOption: '',
        questionErorr: '',
        erorr: ''
      })
    } 
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  addQuestion = () => {
    return (
      <div>
        <hr/>
        {this.state.questionErorr ? (
          <div className="alert alert-danger">
            {this.state.questionErorr}
          </div>
        ) : ""}
        <div className="form-group">
          <label>Question</label>
          <input 
            type="input" 
            className="form-control" 
            id="name" 
            placeholder="Enter Question"
            name="question" 
            onChange={this.handleInputChange}
            value={this.state.question} />
        </div>

        <label>Write question options</label>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-default">A</span>
          </div>
          <input 
            type="text" 
            className="form-control" 
            name="a" 
            onChange={this.handleInputChange}
            value={this.state.a} />
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-default">B</span>
          </div>
          <input 
            type="text" 
            className="form-control" 
            name="b"
            onChange={this.handleInputChange} 
            value={this.state.b}/>
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-default">C</span>
          </div>
          <input 
            type="text" 
            className="form-control"
            name="c" 
            onChange={this.handleInputChange}
            value={this.state.c} />
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-default">D</span>
          </div>
          <input 
            type="text" 
            className="form-control"
            name="d" 
            onChange={this.handleInputChange} 
            value={this.state.d}/>
        </div>

        <label>Select true option</label>

        <div className="input-group mb-3">
          <select 
            className="form-control"
            name="trueOption"
            onChange={this.handleInputChange}>
            <option value="">Select true option</option>
            <option value="a">A</option>
            <option value="b">B</option>
            <option value="c">C</option>
            <option value="d">D</option>
          </select>
        </div>

        <button 
          type="button" 
          className="btn btn-primary mb-3"
          onClick={this.handleQuestion}
        >Submit Question</button>
      </div>
    )
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if(this.state.questions.length > 0){
      axios.post('/api/create',{
        creatorName: this.state.creatorName,
        quizName: this.state.quizName,
        questions: this.state.questions
      })
      .then(res => {
        this.setState({
          creatorName: '',
          quizName: '',
          question: '',
          a: '',
          b: '',
          c: '',
          d: '',
          trueOption: '',
          questions: [],
          erorr: '',
        })
      })
      .catch(err => {
        if(err.response){
           this.setState({
              erorr: err.response.data
            })
        }
        //console.log(err)
      })
    }else{
      this.setState({erorr: "Add any question"})
    }

  }

  render(){
    return (
      <div className="container mt-3">
        <h3 className="text-center mb-2">Create Quiz</h3>
        {this.state.erorr ? (
          <div className="alert alert-danger">
            {this.state.erorr}
          </div>
        ) : ""}
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input 
                type="input" 
                className="form-control" 
                id="name" 
                name="creatorName" 
                placeholder="Enter Username"
                onChange={this.handleInputChange}
                value={this.state.creatorName} />
            </div>

            <div className="form-group">
              <label>Quiz Name</label>
              <input 
                type="input" 
                className="form-control" 
                id="name" 
                name="quizName" 
                placeholder="Enter Quiz Name"
                onChange={this.handleInputChange}
                value={this.state.quizName} />
            </div>
            
            <button type="submit" className="btn btn-primary">Submit</button>

            <hr/>
            
            <div className="accordion pb-1" id="accordionExample">
              {this.state.questions.length > 0 ? (<h4 className="pb-1">Created Questions</h4>): ""}
              {this.state.questions.map((question,i) => 
                <Collapse
                  id={i}
                  question={question.question}
                  a={question.a}
                  b={question.b}
                  c={question.c}
                  d={question.d}
                  true={question.true}
                  key={i}/>
                )
              }
            </div>



            <span className="link" onClick={()=> this.setState({toggleQuestion: !this.state.toggleQuestion})}>Add question</span>
            {this.state.toggleQuestion ? this.addQuestion() : ""}
          </form>
      </div>
    )
  }

}

