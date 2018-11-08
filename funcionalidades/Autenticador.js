//autenticador
var express = require('express')(),
    passport =  require('passport'),
    local = require('passport-local').Strategy,
    galletitas = require('cookie-parser'),
    usuario = require('../Modelos/usuario.js');
    

module.exports = express.use(require('body-parser').urlencoded({ extended: true })),
express.use(galletitas('secreto')),
express.use(require('express-session')({
            secret :"secreto",
            resave : true,
            saveUninitialized : true
            })), 

passport.use(new local(usuario.authenticate())),
express.use(passport.initialize()),
express.use(passport.session()),
passport.serializeUser(usuario.serializeUser()),
passport.deserializeUser(usuario.deserializeUser());

