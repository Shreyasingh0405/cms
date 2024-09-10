const { check, validationResult } = require('express-validator')

const addCreator = [
    check('firstName').notEmpty().withMessage('firstName should be required'),
    check('firstName').isAlpha().withMessage('firstname should be alphabets'),
    check('lastName').notEmpty().withMessage('lastName should be required'),
    check('lastName').isAlpha().withMessage('lastname should be alphabets'),
    check('email').notEmpty().isEmail().withMessage('Email should be required and in proper format'),
    check('contact').notEmpty().isMobilePhone().withMessage('contact should be required in proper format'),
   check('contact').isLength({max:10,min:10}).withMessage('invalid number'),
   check('contact').matches(/^(\+91|0)?(98|99|96|93|92|95|97|94|70|77|78|79|81|82|83|84|85|86|87|88|89|68|69|67|66|65|64|63|62|61|60)[0-9]{8}$/
   ).withMessage('invalid number'),
    check('password').notEmpty().withMessage('Password should be required'),
    check('password').isStrongPassword().withMessage('password should be strong containing atleast 8 characters in which atleast uppercase,lowercase,special character & numeric value'),
    (req, res, next) => {
        const errors = validationResult(req).array()
        if (errors.length > 0) {
            return res.send({ status: 0, response: errors[0].msg })
        } return next()
    }]
 const loginnCreator = [
        check('email').notEmpty().isEmail().withMessage('Email should be required and in proper format'),
        check('password').notEmpty().withMessage('Password should be required'),
    ]
    module.exports={addCreator ,loginnCreator}

    
