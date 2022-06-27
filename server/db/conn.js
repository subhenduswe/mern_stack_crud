const mongoose = require("mongoose");


const DB = "mongodb+srv://subhendukundu:subhendu@cluster0.wz4p3ep.mongodb.net/mernstack?retryWrites=true&w=majority";

mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=> console.log("connection start")).catch((error)=> console.log(error.message));


