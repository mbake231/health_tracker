const Joi = require('joi');

const activityObjectSchema = Joi.object({
    activity_type: Joi.string()
        .valid('diet','fasting','workout','alcohol')
        .required(),

    date: Joi.date()
        .iso()
        .required(),
    
    activity_data: Joi.object({
        fasted:Joi.boolean(),
        followedDiet:Joi.boolean(),
        workedOut:Joi.boolean(),
        alcoholDrinksHad:Joi.number()
    })
    
});

 function validateActivityObject(obj, cb){
        const test  = activityObjectSchema.validate(obj);
        if (test.error){
            console.log(test.error)
            return cb(false)
        }
        else{
            return cb(true)
        }
}

exports.validateActivityObject=validateActivityObject;