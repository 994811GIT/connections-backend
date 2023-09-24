const express = require("express")
require("dotenv").config()
const cors = require("cors")
require("./db") //For establishing the connection to the database
const routes = require("./routes")

const app = express(); //Creating an instance of express

app.use(cors())
app.use(routes)
app.use(express.static("public"))
app.get('/',(req,res)=>{
    res.send("Welcome user")
})


app.listen(process.env.PORT,()=>{
    console.log(`Server is running at the port ${process.env.PORT}`)
})