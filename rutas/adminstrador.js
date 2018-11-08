var fs = require('fs'),
    Blog = require('../Modelos/entradaDeBlog.js'),
    passport = require('passport'),
    router = require('express').Router(),
   // cargador = require('../funcionalidades/Cargador.js'),
    Usuario = require('../Modelos/usuario.js');
   


router.get("/administrador", function(req,res){
    res.render("autenticador",{mensajeError: res.locals.mensajeError , mensajeExito: res.locals.mensajeExito, mensajeAdvertencia: res.locals.mensajeAdvertencia});
    
    });

router.post("/administrador", passport.authenticate("local",{failureRedirect:'/administrador' , failureFlash: 'Nombre de usuario o contrasena invalidas' }),
        
                function(req,res){
                
                req.flash("exito","Bienvenido " + req.body.username);
                res.redirect("/administrador/escritorio");
           });


router.get("/administrador/escritorio", logeado, function(req,res){
    
        Blog.find({},function(err,entradas){
            if (err) {
            console.log(err);
            } else{
            entradas.forEach(function(entrada){
	  
			if(entrada.tipo == "imagen"){fs.writeFile('./public/'+entrada.media.archivoNombre,entrada.media.contenedor,(err)=>{if(err) throw err;});
	}});		
        res.render("editor_blog",{entradas:entradas, mensajeError: res.locals.mensajeError , mensajeExito: res.locals.mensajeExito, mensajeAdvertencia: res.locals.mensajeAdvertencia});
	}});
        });

router.get("/logout",function(req,res){
    req.logout();
    req.flash("exito","Cierre de sesion exitioso");
    res.redirect("/");
});

router.get("/registro",function(req,res){
    
    res.render("registro");
});

router.post('/registro', function(req, res) {
    Usuario.register(new Usuario({username : req.body.username}), req.body.password, function(err,username) {
        if (err) {
            //console.log(req.body.username + " - " + req.body.password);
                   req.flash('error' + err);
            return res.render('registro',{username:username, mensajeError:res.locals.mensajeError});
        }

        passport.authenticate('local')(req, res, function () {
            req.flash("exito","Nuevo usuario creado " + res.locals.username);
            res.redirect('/administrador/escritorio');
        });
    });
});




function logeado(req,res,next){
    if(req.isAuthenticated()){
        
        return next();
    }
    
    else{
        req.flash("error","No estas logeado!!");
        res.redirect('/');
    }
}

module.exports = router;