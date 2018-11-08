// introducir registros.


var express = require('express'),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");
// configurar app

app.set("view engine","ejs");
app.use(express.static("public"));


mongoose.connect('mongodb://localhost/blogsDB');

 var blogSchema = new mongoose.Schema({
    nombre:String,
    imagen:String,
    descripcion:String,

 });
 
 var Blog = mongoose.model("Blog",blogSchema);

 Blog.create({nombre:"Decoraciones en uñas acrilicas",
    imagen:"https://aammsa-dm2305.files.1drv.com/y3mD_RHQkKlfRlIAEOjMwCEhLliXQs-84gVXVFHeBFP6jMhOEAsLR8oPsTHUXPztTry-HqeHIUC9za2iZiXNlUoFf2RE7jaowAkySu7EANWcc6dBuLPBOVdmlRPKTU0ZpKHmLe2CKQeHH7HRAU1zF5UnDRPjLfoBVgP6fbaFJhRtGc?width=640&height=314&cropmode=none",
    descripcion:"Praesent volutpat nibh lectus, pharetra feugiat enim maximus in. Praesent nec feugiat ipsum, ac semper massa. Aliquam sit amet massa sit amet mauris feugiat posuere et eu justo. Maecenas tristique erat leo, id commodo lorem faucibus ut. Aenean id hendrerit ex, nec sollicitudin nibh. Pellentesque magna nisi, dictum tempor molestie id, imperdiet sed tellus. Ut et lectus enim. Praesent vel ex eu massa scelerisque gravida. Proin volutpat erat eget justo cursus, quis rutrum orci fringilla. Nullam leo neque, fringilla id neque et, cursus pellentesque quam."    
    },function(err,Blog){
        if(err){console.log(err)}
        else{console.log("Entrada de blog agregada");console.log(Blog)}
        
    });
 