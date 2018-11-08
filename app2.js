// app inicializar servidor para el proyecto de belleza
  
var express = require('express'),
    app = express(),
    multer = require("multer"),
    fs = require('fs'), path = require('path'),
    storage = multer.memoryStorage();
   
function fileFilter(req,file,cb){
        if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'||file.mimetype == 'image/gif'||file.mimetype == 'video/ogg' || file.mimetype == 'video/mp4'){
           cb(null,true); 
        }
        else{cb(null,false);}
    }
          
  
    var uploader= multer({storage:storage,fileFilter:fileFilter});
 
    var mongoose = require("mongoose");
      
// configurar app
  
app.set("view engine","ejs");
app.use(express.static("public"));
  
// conectar base de datos
//mongoose.connect('mongodb://heroku_krl79b6s:qromvdsnp8vchogeus47h2gaa6@ds139430.mlab.com:39430/heroku_krl79b6s')
mongoose.connect('mongodb://localhost/blogsDB');
  
 var blogSchema = new mongoose.Schema({
    fecha: {type: Date, default: Date.now},
    nombre:String,
    media:{archivoNombre:String, contenedor:Buffer},
    descripcion:String,
    tipo:String
  
 });
   
 var Blog = mongoose.model("Blog",blogSchema);
  
 app.get("/",function(req,res){
      
    Blog.find({}).sort({fecha: -1}).exec(function(err,entradas){
      if (err) {
         console.log(err);
      } else { 
     entradas.forEach(function(entrada){
	fs.writeFile('./public/'+entrada.media.archivoNombre,entrada.media.contenedor,(err)=>{if(err) throw err});
	});
      res.render("inicio",{entradas:entradas});
         
        }
        
      });
    }
);
   
   
app.get("/rebecca200994",function(req,res){
    Blog.find({},function(err,entradas){
      if (err) {
         console.log(err);
      } else{
	entradas.forEach(function(entrada){
	  
		fs.writeFile('./public/'+entrada.media.archivoNombre,entrada.media.contenedor,(err)=>{if(err) throw err});
		});		
	
	res.render("editor_blog",{entradas:entradas});
	}

    
      });
    }
);
   
app.get("/servicios",function(req,res){
    res.render("servicios");}
);
  
  
app.get("/:id",function(req,res){
    Blog.findById(req.params.id,function(err,entradas){
      if (err) {
         console.log(err);
      } else{
    res.render("mostrar",{entradas:entradas})}
      });
    }
);
  
  
app.post("/Blog",uploader.single('media'),function(req,res){
     
    var nombre = req.body.nombre;
    var contenedor = req.file.buffer;
    var archivoNombre =Date.now()+1000*Math.floor(Math.random())+path.extname(req.file.originalname);
    var descripcion =req.body.descripcion;
    var tipo = req.body.tipo;
    var nuevaEntrada = {nombre: nombre, media:{archivoNombre:archivoNombre, contenedor:contenedor},descripcion: descripcion, tipo:tipo};
    Blog.create(nuevaEntrada,function(err,miEntrada){
      if (err) {
         console.log(err);
      } else{
         console.log("Entrada agregada");
         res.redirect("/")}
      });
  
});
  
app.post("/:id",uploader.single('media'),function(req,res){
      
    var nombre, contenedor, descripcion,tipo,nuevaEntrada;
      
    if(req.file!=undefined){var archivoNombre =Date.now()+1000*Math.floor(Math.random())+path.extname(req.file.originalname);
	nombre = req.body.nombre; 
	contenedor = req.file.buffer;   
        descripcion =req.body.descripcion;
        tipo = req.body.tipo;
     	nuevaEntrada = {nombre: nombre, media:{archivoNombre:archivoNombre, contenedor:contenedor},descripcion: descripcion, tipo:tipo};
   
     } else {
        nombre = req.body.nombre;    
        descripcion =req.body.descripcion;
        tipo = req.body.tipo;
        nuevaEntrada = {nombre: nombre,descripcion: descripcion};
    }
      
    Blog.findByIdAndUpdate(req.params.id,nuevaEntrada,function(err,miEntrada){
      if (err) {
         console.log(err);
      } else{
         console.log("Modificacion exitosa");
         res.redirect("/")}
      });
  
  
});
  
app.get("/eliminar/:id",function(req,res){
    Blog.findByIdAndRemove(req.params.id,function(err,eliminado){
        if (err) {
         console.log(err);
      } else{
         fs.unlinkSync('./public/'+eliminado.media.archivoNombre);
           
         res.redirect("/")}
          
    });
      
});
  
app.get("*",function(req,res){
     
 res.send("Esta es una ruta no definida, para volver <a href='/'>haga click aca </a>");
     
 });
    
 app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Servidor inciado!!!");
});
 
