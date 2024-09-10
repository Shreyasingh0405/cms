const { check, validationResult } = require('express-validator')

const addContent = [
    check('creatorId').notEmpty().withMessage('creatorId should be required'),
    check('description').notEmpty().withMessage('description should be required'),
    check('title').notEmpty().withMessage('title should be required'),
    (req, res, next) => {
        const errors = validationResult(req).array()
        if (errors.length > 0) {
            return res.send({ status: 0, response: errors[0].msg })
        } return next()
    }]
module.exports = { addContent }
