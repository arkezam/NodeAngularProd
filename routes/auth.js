const { Router } = require ('express')
const { check } = require('express-validator')
const { crearUsuario, loginUsuario, renew } = require('../controllers/auth')
const validarLogin = require('../middlewares/validar')
const { validarJWT } = require('../middlewares/validarJWT')




const router = Router()

router.post('/new', 
    [check('name','debe llenar el campo nombre').not().isEmpty(),
   check('email','el email es obligatorio').isEmail(), 
   check('password', 'La contraseña debe tener al menos 6 caracteres' ).isLength({ min: 6 }), 
   validarLogin],
   crearUsuario)


router.post('/', 
   [      
   check('email','el email es obligatorio').isEmail(), 
   check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
   validarLogin
], loginUsuario)

// validar y revalidar token de us
router.get('/renew', validarJWT   ,renew)


module.exports = router 