//Esquema de blog

var mongoose = require("mongoose");

 var blogSchema = new mongoose.Schema({
    fecha: {type: Date, default: Date.now},
    nombre:String,
    media:{archivoNombre:String, contenedor:Buffer},
    descripcion:String,
    tipo:String
  
 });

module.exports = mongoose.model("Blog",blogSchema);