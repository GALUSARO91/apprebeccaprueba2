//modelo usuario

var mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose');
    
var usuarioSchema = new mongoose.Schema({
    username: String,
    password: String
    
});

usuarioSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("usuario",usuarioSchema);