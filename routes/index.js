// ./routes/index.js

const express	= require("express")
const router	= express.Router()

const indexController		= require("./../controllers/indexController")


router.get("/", indexController.home)

//CREAR USUARIO
router.get("/signup", )

//MOSTRAR EL FORMULARIO
router.get("/signup", indexController.viewRegister)

//MOSTRAR EL FORMULARIO
router.get("/login", indexController.viewLogin)

module.exports = router