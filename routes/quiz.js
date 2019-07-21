const router = require('express').Router();
const Quiz = require('../models/Quiz');

router.get('/quiz/:id', async (req, res) => {
   const quiz = await Quiz.findById(req.params.id);

   if (!quiz) return res.status(404).send('The quiz with the given ID was not found.');

   await res.send(quiz);
 });


module.exports = router;


