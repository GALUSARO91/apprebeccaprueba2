//Crear crear, actualizar, y eliminar blogs


var router = require('express').Router({mergeParams:true}),
    cargador = require('../funcionalidades/Cargador.js'),
    path = require('path'),
    fs = require('fs'),
    Blog = require('../Modelos/entradaDeBlog.js');
//Guardar nuevo blog
router.post("/Blogs",cargador.single('media'),function(req,res){
    
    var nombre, contenedor, tipo, archivoNombre, descripcion, nuevaEntrada;
    
     tipo = req.body.tipo;
    
    if(tipo=='imagen'){
    nombre = req.body.nombre;
    contenedor = req.file.buffer;
    archivoNombre =Date.now()+1000*Math.floor(Math.random())+path.extname(req.file.originalname);
    descripcion =req.body.descripcion;
    
    nuevaEntrada = {nombre: nombre, media:{archivoNombre:archivoNombre, contenedor:contenedor},descripcion: descripcion, tipo:tipo};
    }
    
    else{
    
   
    nombre = req.body.nombre;
    archivoNombre = /(?:[https:\/\/youtu\.be\/])(\w[^\/]+)$/g.exec(req.body.media)[1];
    descripcion =req.body.descripcion;
    nuevaEntrada = {nombre: nombre, media:{archivoNombre:archivoNombre},descripcion: descripcion, tipo:tipo};
    }
        
   
    
    Blog.create(nuevaEntrada,function(err,miEntrada){
      if (err) {
         console.log(err);
      } else{
         console.log("Entrada agregada");
         console.log(miEntrada);
         res.redirect("/");}
      });
  
});
// llamar blog
router.get("/Blogs/:id",function(req,res){
    Blog.findById(req.params.id,function(err,entradas){
      if (err) {
         console.log(err);
      } else{
    res.render("mostrar",{entradas:entradas, mensajeError: res.locals.mensajeError , mensajeExito: res.locals.mensajeExito, mensajeAdvertenca: res.locals.mensajeAdvertencia});}
      });
    }
);

//editar blog
router.post("/Blogs/:id",cargador.single('media'),function(req,res){
      
    var nombre, contenedor, descripcion,tipo,nuevaEntrada;
    
    tipo = req.body.tipo;
    
    if(tipo =="imagen"){
      
    if(req.file!== undefined){var archivoNombre =Date.now()+1000*Math.floor(Math.random())+path.extname(req.file.originalname);
    nombre = req.body.nombre; 
	contenedor = req.file.buffer;   
        descripcion =req.body.descripcion;
        
     	nuevaEntrada = {nombre: nombre, media:{archivoNombre:archivoNombre, contenedor:contenedor},descripcion: descripcion, tipo:tipo};
   
     } else {
         
        nombre = req.body.nombre;    
        descripcion =req.body.descripcion;
        nuevaEntrada = {nombre: nombre,descripcion: descripcion};
    }
    
    }
        else {
            
            nombre = req.body.nombre;
            archivoNombre = /(?:[https:\/\/youtu\.be\/])(\w[^\/]+)$/g.exec(req.body.media)[1];
            descripcion =req.body.descripcion;
            nuevaEntrada = {nombre: nombre, media:{archivoNombre:archivoNombre},descripcion: descripcion, tipo:tipo};
            
        }
      
    Blog.findByIdAndUpdate(req.params.id,nuevaEntrada,function(err,miEntrada){
      if (err) {
         console.log(err);
      } else{
         req.flash("exito","Entrada modificada");
         res.redirect("/administrador/escritorio");}
      });
  
  
});
//eliminar blog
router.delete("/Blogs/:id",function(req,res){
    Blog.findByIdAndRemove(req.params.id,function(err,eliminado){
        if (err) {
         console.log(err);
      } else{
        if(eliminado.tipo == "imagen"){ fs.unlinkSync('./public/'+eliminado.media.archivoNombre)}}
        res.redirect("/administrador/escritorio");
    });
      
});
 
module.exports = router;  