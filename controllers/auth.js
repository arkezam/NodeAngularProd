const Usuario = require("../models/Usuario.js")
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/jtw.js");



const crearUsuario = async (req, res)=>{
 
    const {name, email, password} = req.body
    // console.log(email, password);

    try {
    // verificar email unico
     usuario = await Usuario.findOne({email:email});

    if(usuario){
        return res.status(500).json({
            ok:false,
            msg:"el usuario ya existe"
        })
    }

    // crear usuario con el modelo
    const dbUser = new Usuario (req.body) 

    // encriptar la contraseña

    const salt = bcrypt.genSaltSync();
    dbUser.password = bcrypt.hashSync(password,salt);
    // generar JWT
    const token = await generarJWT(dbUser.id, name)

    // crear usuario
    dbUser.save()


    // generar respuesta exitosa
    return res.status(201).json({
        ok:true,
        uid: dbUser.id,
        email: dbUser.email,
        name,
        token
    })

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:"false",
            msg: "Por favor comuniquese con el administrador",
            error: error
        })
    }
}

const loginUsuario = async (req, res)=>{
 
    const {email , password} = req.body
    console.log(email, password)

    try {
        const dbUser = await Usuario.findOne({email:email});
        if(!dbUser){
            return res.status(400).json({
                ok:false,
                msg:"el correo no existe"
            })
        } 
        const validPass = bcrypt.compareSync(password, dbUser.password) 
        
        if(!validPass){
            return res.status(400).json({
                ok:false,
                msg:"Password no es Valido"
            })
        } 

        // generar JWT
    const token = await generarJWT(dbUser.id, dbUser.name)
        res.json({
            ok:true,
            uid: dbUser.id,
            email: dbUser.email,
            name:dbUser.name,
            token
        })

    } catch (error) {
    console.log(error);
    return res.status(500).json({
        ok:"false",
        msg: "hable con el administrador",
        error: error
    })
    }
    
}

// revalidar token
const renew = async (req, res)=>{

    const {uid} = req;

    const dbUSer =  await Usuario.findById(uid);

    const token = await generarJWT(uid )
    return res.json({
        ok:"true", 
        uid,
        name:dbUSer.name,
        token,
        email:dbUSer.email
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    renew

}