const moongose = require('mongoose');


const Question = new moongose.Schema({
   question: {
      type: String,
      required: true,
      max: 255
   },
   a: {
      type: String,
      required: true,
      max: 255
   },
   b: {
      type: String,
      required: true,
      max: 255
   },
   c: {
      type: String,
      required: true,
      max: 255
   },
   d: {
      type: String,
      required: true,
      max: 255
   },
   true: {
      type: String,
      required: true,
      max: 255
   }
})

const QuizSchema = new moongose.Schema({
   creatorName: {
      type: String,
      required: true,
      min: 3,
      max:255
   },
   quizName: {
      type: String,
      required: true,
      min: 3,
      max: 255
   },
   questions: [Question],
   date: {
      type: Date,
      default: Date.now
   }
});

module.exports = moongose.model('Quiz', QuizSchema);