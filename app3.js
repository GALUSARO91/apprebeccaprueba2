// app inicializar servidor para el proyecto de belleza
  
var express = require('express'),
    app = express(),
    mongoose = require("mongoose"),
    Blogs = require('./rutas/Blogs.js'),
    autenticador = module.require('./funcionalidades/Autenticador.js'),
    inicio = require('./rutas/inicio.js'),
    Servicios = require('./rutas/Servicios.js'),
    admin = require('./rutas/adminstrador.js'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    flash = require('connect-flash');

    


// configurar app


app.set("view engine","ejs");
//app.set('views', __dirname + '/views');
app.use(require('cookie-parser')());
app.use(express.static("public"));
app.use(require('body-parser').urlencoded({ extended: true }));
//app.use(require('express-session')({ secret: 'secreto', resave: true, saveUninitialized: true}));
app.use(session({
    store: new MongoStore({ mongooseConnection: mongoose.connection, autoRemove: 'native', ttl: 30*60 }),
    secret: 'secreto', resave: true, saveUninitialized: true
}));

app.use(methodOverride("_method"));
app.use(flash());

app.use(function (req,res,next){
    res.locals.UsuarioActual = req.body.username;
    res.locals.mensajeError = req.flash("error");
    res.locals.mensajeExito = req.flash("exito");
    res.locals.mensajeAdvertencia = req.flash("advertencia");
    next();
    
});




// conectar base de datos
mongoose.connect('mongodb://heroku_krl79b6s:qromvdsnp8vchogeus47h2gaa6@ds139430.mlab.com:39430/heroku_krl79b6s');
//mongoose.connect('mongodb://localhost/blogsDB');

//cargar modulos.
app.use(autenticador);
app.use(Blogs);
app.use(inicio);
app.use(Servicios);
app.use(admin);

    
    


//ajustar rutas

app.use('/',inicio);  

app.use('/servicios',Servicios);

app.use('/Blogs',Blogs);

app.use('/administrador', admin);

app.use('/administrador/escritorio', admin);

app.use('/logout',admin);

app.use('/Blogs/:id',Blogs);
   
app.get("*",function(req,res){
     
 res.send("Esta es una ruta no definida, para volver <a href='/'>haga click aca </a>");
     
 });

/*app.listen(3000,function(err){
     if (err) { throw err;}
    console.log("Servidor inciado!!!");
    });*/
    
 app.listen(process.env.PORT,process.env.IP,function(err){
     if (err) { throw err;}
    console.log("Servidor inciado!!!");
});
