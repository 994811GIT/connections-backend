const mongoose = require("mongoose")

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser : true
}).then(()=>{
    console.log("Connected to the database")
}).catch(
    console.log(e=>console.log(e))
);

module.exports = mongoose;