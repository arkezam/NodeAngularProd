const { validationResult } = require("express-validator");



const validarLogin = (req, res, next) => {
    const errors = validationResult( req );
    if(!errors.isEmpty()){
        console.log(errors.mapped()) 
        return res.status(400).json({
            errors:errors.mapped()
        })
    }
    next()
} 


module.exports = validarLogin