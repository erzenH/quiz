const joi = require("@hapi/joi");

const createValidation = (data) =>{
   const schema = {
      creatorName: joi.string().min(3).max(255).required(),
      quizName: joi.string().min(3).max(255).required(),
      questions: joi.array().items(joi.object().keys({
         question: joi.string().max(255).required(),
         a: joi.string().max(255).required(),
         b: joi.string().max(255).required(),
         c: joi.string().max(255).required(),
         d: joi.string().max(255).required(),
         true: joi.string().max(255).required()
      }))
   }
   return joi.validate(data, schema)
}

module.exports.createValidation = createValidation;