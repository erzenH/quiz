const router = require('express').Router();
const Quiz = require('../models/Quiz');

router.get('/quizes', async (req, res) => {
   const quizes = await Quiz.find().sort('-date');
   res.send(quizes);
});


module.exports = router;


