const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
// const multer = require('multer');
require('dotenv').config();

// var forms = multer();

//app.use(express.bodyParser());
app.use(express.json({ limit: '5mb' }));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// const filestorage=multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,'upload')
//     },
//     filename:(req,file,cb)=>{
//         cb(null,file.originalname)
//     }
// })

// const filefilter=(req,file,cb)=>{
//     if(file.mimetype.includes("png")||
//     file.mimetype.includes("jpg")||
//     file.mimetype.includes("jpeg")
//     ){
//         cb(null,true)
//     }
//     else{
//         cb(null,false)
//     }
// }

//app.use(multer({storage:filestorage,fileFilter:filefilter,limits:{fieldSize:1024*1024*5}}).single('image'));
const apiRouter = require('./routes/logRegApi.routes');
app.use('/api', apiRouter)

 const dbDriver = "mongodb://localhost:27017/uberwater";

const port = process.env.PORT ;

mongoose.connect(dbDriver, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(res => {
    app.listen(port, () => {
        console.log('DB is connected');
        console.log(`Server is connected @ http://localhost:${port}`);
    })
}).catch(err => {
    console.log(err);
})