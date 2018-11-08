//ruta inicio
var fs = require('fs'),
    Blog = require('../Modelos/entradaDeBlog.js'),
    router = require('express').Router();
    
    //router.use(flash());
    
    
router.get("/",function(req,res){
      
    Blog.find({}).sort({fecha: -1}).exec(function(err,entradas){
      if (err) {
         console.log(err);
      } else { 
     entradas.forEach(function(entrada){
	if(entrada.tipo == "imagen"){fs.writeFile('./public/'+entrada.media.archivoNombre,entrada.media.contenedor,(err)=>{if(err) throw err;});
	}});
      
        }
        
       res.render("inicio",{entradas:entradas, mensajeError: res.locals.mensajeError , mensajeExito: res.locals.mensajeExito, mensajeAdvertenca: res.locals.mensajeAdvertencia});
      });
    }
);

module.exports = router;
