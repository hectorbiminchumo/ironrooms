// ./controllers/indexController.js

const User = require("../model/user")

const bcryptjs = require("bcryptjs")

exports.home = async (req, res) => {

	res.render("home")

}
exports.viewRegister = (req, res) =>{
    res.render("auth/signup")
}


exports.register = async (req, res) => {

    console.log(req.body);
    //OBTENCION DE DATOS DEL FORMULARIO
    
    const email   = req.body.email
    const password = req.body.password

    if(!email || !password){
        res.render("auth/signup",{
            errorMessage: "Uno o mas campos estan vacios. Revisalos nuevamente."
        })

        return
    }


const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/

    if(!regex.test(password)){
        res.render("auth/signup",{
            errorMessage: "Tu password debe de contener 6 caracteres, minimo un numero y una mayuscula"
        })
        return
    }

//ENCRIPTADO DE PASSWORD
    try{
        const salt = await bcryptjs.genSalt(10)
        const passwordEncriptado= await bcryptjs.hash(password, salt)
        const newUser = await User.create({
            email,
            passwordEncriptado

        })
        console.log(newUser);

        //REDIRECCION DE USUARIO
        res.redirect("/login")
    }catch(error){
        console.log(error);

        res.status(500).render("auth/signup", {
            errorMessage: "Hubo un error con la validez de tu correo. Intenta nuevamente. No dejes espacios y usa minusculas"
        })

    }
}

exports.viewLogin = async (req, res) => {
    res.render("auth/login")


}