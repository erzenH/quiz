import React from 'react';
import axios from "axios";
import '../App.css';
import Option from "./quizComponents/Option";
import Score from "./quizComponents/Score";
import Question from "./quizComponents/Question";
import StartEnd from "./quizComponents/StartEnd";


let initialState = {
  quiz: [],
  questions: [],
  queue: 0,
  question: "",
  a: "",
  b: "",
  c: "",
  d: "",
  correct: "",
  start: false,
  answer: "",
  message: "",
  isCorrect: false,
  isAnswered: false,
  correctScore: 0,
  incorrectScore: -1,
  isEnd: false
}

class App extends React.Component{

  
  state = initialState;

  showQuestions = () => {
    const {queue, questions} = this.state;

    if(queue < questions.length){
      this.setState({
        queue: queue+1,
        question: questions[queue].question,
        a: questions[queue].a,
        b: questions[queue].b,
        c: questions[queue].c,
        d: questions[queue].d,
        correct: questions[queue].true,
        answer: "",
        message: "",
        isAnswered:false
      });

      
      if(!this.state.isAnswered){
        this.setState({incorrectScore: this.state.incorrectScore+1})
      }
    }
    if(queue === (questions.length)){
      if(!this.state.isAnswered){
        this.setState({
          isAnswered: true,
          incorrectScore: this.state.incorrectScore+1,
          queue: questions.length+1,
          isEnd: true,
          start: false,
        })
      }
      else{
        this.setState({
          isAnswered: true,
          incorrectScore: this.state.incorrectScore,
          queue: questions.length+1,
          isEnd: true,
          start: false,
        })

      }
    }
  }

  startGame = () => {
    this.setState({
      ...initialState,
      start: true,
    },
    ()=>{this.showQuestions()})
  }

  handleChange = value => {
    if(!this.state.isAnswered){
      this.setState(
        {answer: value, isAnswered:true},
        () => {this.controllAnswer()},
      );
    }
  }

  controllAnswer = () => {
    const {answer, correct} = this.state;
    //console.log(answer)
    if(correct === answer){
      this.setState({
        message: "Correct",
        isCorrect: true,
        correctScore: this.state.correctScore+1
      })
    }
    else{
      this.setState({
        message: `Incorrect, the correct answer is ${correct}`,
        incorrectScore: this.state.incorrectScore+1
      })
    }
  }

  changeCollor = (value) => {
    if(this.state.isAnswered && value === this.state.correct){
      return {
        backgroundColor: '#FFF3CD',
       // border: 'none'
      }
    }
    if(this.state.isAnswered && value !== this.state.correct){
      return {
        backgroundColor: '#D6D8D9',
       // border: 'none'
      }
    }
  }

  test = () =>{
    return {backgroundColor: 'blue'};
  }

  componentDidMount() {
    axios.get('/api/quiz/'+this.props.match.params.id)
      .then(res => {
        const quiz = res.data;
        this.setState({
          quiz: quiz, 
          questions: quiz.questions
        });
        initialState.questions = quiz.questions
        //console.log(quiz.questions)
        // console.log(initialState)
      })
      .catch(err => console.log(err))
  }
  
 
  render(){
    return(
      <div className="container text-center">
      {
        !this.state.start ? 
          (
            <StartEnd 
              isEnd={this.state.isEnd}
              correctScore={this.state.correctScore}
              incorrectScore={this.state.incorrectScore}
              startGame={this.startGame}
            />
          ) 
            : 
          ( // Quiz part
            <div>
              <Score 
                correctScore={this.state.correctScore}
                incorrectScore={this.state.incorrectScore} />
              <div>
                <Question 
                  question={this.state.question}
                  questionNumbers={this.state.questions.length}
                  currentQuestionNr={this.state.queue} />

                <Option 
                  name={"A"}
                  value={this.state.a}
                  handleChange={this.handleChange}
                  style={this.changeCollor(this.state.a)}                             
                />
                <Option 
                  name={"B"}
                  value={this.state.b}
                  handleChange={this.handleChange}
                  style={this.changeCollor(this.state.b)}                    
                />
                <Option 
                  name={"C"}
                  value={this.state.c}
                  handleChange={this.handleChange}
                  style={this.changeCollor(this.state.c)}                    
                />
                <Option 
                  name={"D"}
                  value={this.state.d}
                  handleChange={this.handleChange}
                  style={this.changeCollor(this.state.d)}                    
                />
              </div>

              <h4>{this.state.message}</h4>
              <button 
                onClick={this.showQuestions}
                type="button" 
                className="btn btn-primary">
                Next {">>>"}
              </button>
            </div>
          )   
      }
      </div>
    )
  }
}

export default App;
