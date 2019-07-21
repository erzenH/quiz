import React from 'react';
import axios from "axios"
import QuizCard from "./quizCard"

export default class Home extends React.Component {
  state = {
    quizes: []
  }

  componentDidMount() {
    axios.get(`/api/quizes`)
      .then(res => {
        const quizes = res.data;
        this.setState({ quizes: quizes });
      })
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.quizes.map(quiz => 
            <QuizCard 
              quizLength={quiz.questions.length} 
              quizName={quiz.quizName}
              creator={quiz.creatorName}
              id={quiz._id}
              key={quiz._id}
              />
            )}
        </ul>
      </div>

    )
  }
}
