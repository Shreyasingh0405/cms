const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const routes = require("./routes/route")
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
mongoose.connect(process.env.MONGOURL)
    .then(() => {
        console.log("mongodb is connected")
    })
    .catch((err) => {
        console.log(err)
    })

    app.use("/",routes)
   app.listen(process.env.PORT||3000,function(){
        console.log("express is running at port "+(process.env.PORT||3000))
    })
