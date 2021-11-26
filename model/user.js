//IMPORTACIONES

const mongoose = require("mongoose")

//SCHEMA

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email es requerido"], //que no este vacio
        match: [/^\S+@\S+\.\S+$/, "Por favor ingresa un email valido."],
        unique: true,
        lowercase: true,
        trim: true
    },
    passwordEncriptado: String
})
//MODELO
const User = mongoose.model("User", userSchema)

//EXPORTACION
module.exports = User