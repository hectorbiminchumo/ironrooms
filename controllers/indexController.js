// ./controllers/indexController.js

const User = require("../model/user")

const bcryptjs = require("bcryptjs")

exports.home = async (req, res) => {

	res.render("home")

}
exports.viewRegister = (req, res) =>{
    res.render("signup")
}


exports.register = async (req, res) => {

    console.log(req.body);
    //OBTENCION DE DATOS DEL FORMULARIO
    
    const email   = req.body.email
    const password = req.body.password

    if(!email || !password){
        res.render("signup",{
            errorMessage: "Uno o mas campos estan vacios. Revisalos nuevamente."
        })

        return
    }


const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/

    if(!regex.test(password)){
        res.render("signup",{
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
        res.redirect("login")
    }catch(error){
        console.log(error);

        res.status(500).render("signup", {
            errorMessage: "Hubo un error con la validez de tu correo. Intenta nuevamente. No dejes espacios y usa minusculas"
        })

    }
}

exports.viewLogin = async (req, res) => {
    res.render("login")

}
exports.login = async (req, res) => {

    try{

        //1. OBTENCION DE DATOS DEL FORMULARIO
        const email = req.body.email
        const password = req. body.password

        //2. VALIDACION DE USUARIO ENCONTRADO EN BD
        const foundUser = await User.findOneAndRemove({ email })

        if(!foundUser){
            res.render("login", {
                errorMessage: "Email o contrasena sin coincidencia."
            })
            return
        }

        //3, VALIDACION DE CONTRASENA
        // COMPARAR LA CONTRASE;A DEL FORMULARIO (1) VS LA CONTRASENA DE LA BASE DE DATOS (2)
        const verifiedPass = await bcryptjs.compareSync(password, foundUser.passwordEncriptado)

        if(!verifiedPass){
            res.render("login", {
                errorMessage: "Email o contrasena erronea. Intenta nuevamente."
            })
            return
        }
        //4. GENERAR LA SESION
        // PERSISTENCIA DE IDENTIDAD
        req.session.currentUser = {
            _id: foundUser._id,
            email: foundUser.email,
            mensaje: "LO LOGRAMOS"
        }

        res.redirect("/users/profile")

    } catch(error){
        console.log(error);
    }


}

exports.logout = async (req,res) => {
    req.session.destroy((error) => {

        //SE EVALUA SI HUBO UN ERROR AL BORRAR LA COOKIE

        if(error){
            console.log(error);
            return
        }
        res.redirect("/")



    })
}