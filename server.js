require("dotenv").config()
const express = require("express")
const mongoose = require('mongoose');
const app = express()
const bodyParser = require("body-parser")


app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(express.json())


app.use((req, res, next) => {
    console.log(req.path + " " + req.method);
    next()
})


app.get("/", (req, res) => {
    res.send("hello world")
})


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, function () {
            console.log(`connected to db and server started at port ${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log(err);
    })