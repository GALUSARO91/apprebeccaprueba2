// app inicializar servidor para el proyecto de belleza

var express = require('express'),
    app = express(),
    multer = require("multer"),
    fs = require('fs'),
    storage = multer.diskStorage({
        destination:function(req,file,cb){
            if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'||file.mimetype == 'image/gif'){
                cb(null,'./public/media/images');
            
                
            }
            else if(file.mimetype == 'video/ogg' || file.mimetype == 'video/mp4'){
                cb(null,'./public/media/videos');

            }
        },        
       filename: function(req,file,cb){
           cb(null,Date.now()+1000*Math.floor(Math.random())+file.originalname);
       }  
       
     
    });
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
mongoose.connect('mongodb://heroku_krl79b6s:qromvdsnp8vchogeus47h2gaa6@ds139430.mlab.com:39430/heroku_krl79b6s');
//mongoose.connect('mongodb://localhost/blogsDB');

 var blogSchema = new mongoose.Schema({
    fecha: {type: Date, default: Date.now},
    nombre:String,
    media:String,
    descripcion:String,
    tipo:String

 });
 
 var Blog = mongoose.model("Blog",blogSchema);

 app.get("/",function(req,res){
    
    Blog.find({}).sort({fecha: -1}).exec(function(err,entradas){
      if (err) {
         console.log(err);
      } else { res.render("inicio",{entradas:entradas});}
      
      });
    }
);
 
 
app.get("/rebecca220994",function(req,res){
    Blog.find({},function(err,entradas){
      if (err) {
         console.log(err);
      } else{
    res.render("editor_blog",{entradas:entradas});}
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
    res.render("mostrar",{entradas:entradas});}
      });
    }
);


app.post("/Blog",uploader.single('media'),function(req,res){
   
    var nombre = req.body.nombre;
    var cadena = req.file.path.split('/');
    var media ="./"+cadena[1]+"/"+cadena[2]+"/"+cadena[3];
    var descripcion =req.body.descripcion;
    var tipo = req.body.tipo;
    var nuevaEntrada = {nombre: nombre, media:media,descripcion: descripcion, tipo:tipo};
    Blog.create(nuevaEntrada,function(err,miEntrada){
      if (err) {
         console.log(err);
      } else{
         console.log("Entrada agregada");
         res.redirect("/")}
      });

});

app.post("/:id",uploader.single('media'),function(req,res){
    
    var nombre, cadena, media, descripcion,tipo,nuevaEntrada;
    
    if(req.file!=undefined){
     nombre = req.body.nombre;    
     cadena = req.file.path.split('/');
     media ="./"+cadena[1]+"/"+cadena[2]+"/"+cadena[3];
     descripcion =req.body.descripcion;
     tipo = req.body.tipo;
     nuevaEntrada = {nombre: nombre, media:media,descripcion: descripcion, tipo:tipo};
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
         //fs.unlinkSync(eliminado.media);
         
         res.redirect("/")}
        
    });
    
});

app.get("*",function(req,res){
   
 res.send("Esta es una ruta no definida, para volver <a href='/'>haga click aca </a>");
   
 });
  
 app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Servidor inciado!!!");
});
