// ./routes/index.js

const express	= require("express")
const router	= express.Router()

const indexController		= require("./../controllers/indexController")


router.get("/", indexController.home)




//CREAR USUARIO
//MOSTRAR EL FORMULARIO
router.get("/signup", indexController.viewRegister)

//ENVIAR DATOS A LA BD

router.post("/signup", indexController.register)



//INICIAR SESION
//MOSTRAR EL FORMULARIO
router.get("/login", indexController.viewLogin)
//MANEJO DE FORMULARIO
// router.post("/login", indexController.login)

//CERRAR SESION
// router.post("/logout", indexController.logout)

module.exports = router