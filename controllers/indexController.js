// ./controllers/indexController.js

exports.home = async (req, res) => {

	res.render("home")

}
exports.viewRegister = (req, res) =>{
    res.render("auth/signup")
}


exports.register = async (req, res) => {

    //OBTENCION DE DATOS DEL FORMULARIO
    const username = req.body.username
    const email   = req. body.email
    const password = req.body.password

    res.render("auth/signup")



}

exports.viewLogin = async (req, res) => {
    res.render("auth/login")


}