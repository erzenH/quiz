const router = require('express').Router();
const Quiz = require('../models/Quiz');
const {createValidation} = require("../validation");

function getQuestions(data){
   const questions = data.questions.map(question => {
      return {
         question: question.question,
         a: question.a,
         b: question.b,
         c: question.c,
         d: question.d,
         true: question.true
      }
   });
   
   return new Promise(reslove => reslove(questions));
}

function getQuiz(data, questionsData){
   const quiz = new Quiz({
      creatorName: data.creatorName,
      quizName: data.quizName,
      questions: questionsData
   });
  return new Promise(reslove => reslove(quiz));

}

router.post('/create', async (req,res)=>{

   const { error } = createValidation(req.body);
   if(error) return res.status(400).send(error.details[0].message);


   let questions = await getQuestions(req.body)
   let quiz = await getQuiz(req.body,questions);

   console.log(quiz)

   try{
      const savedQuiz = await quiz.save();
      await res.send(savedQuiz);
   }catch(err){
      res.status(400).send(err);
   }
});

module.exports = router;