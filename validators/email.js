const {body}= require('express-validator');
function validateEmail(method){
    switch (method) {
        case 'send': {
         return [ 
            body('email', 'email invalido').isLength({max:50}).trim().escape().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
            body('subject','motivo invalido').trim().escape().isLength({max:50}).matches(/^[A-Za-z\s]*$/),
            body('messague','mensaje invalido').trim().escape().matches(/^[A-Za-z\s]*$/),
           ]   
        }

      }
}

module.exports=validateEmail