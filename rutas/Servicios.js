//Servicios
var router = require('express').Router();


router.get("/servicios",function(req,res){
    res.render("servicios");}
);

module.exports = router;