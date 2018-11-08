// cargador de archivos

var multer = require('multer'),
    storage = multer.memoryStorage();
    
function fileFilter(req,file,cb){
        if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'||file.mimetype == 'image/gif'||file.mimetype == 'video/ogg' || file.mimetype == 'video/mp4'){
           cb(null,true); 
        }
        else{cb(null,false);}
    }
        
var uploader= multer({storage:storage,fileFilter:fileFilter});

module.exports = uploader;

