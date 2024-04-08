require("dotenv").config()
const express = require ('express')
const cors = require("cors")
const corsOptions = require ("./config/corsOptions")
const connectDB = require("./config/dbConn")
const  mongoose = require("mongoose")

const PORT = process.env.PORT || 1234
const app = express()
connectDB()

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))

app.get("/", (req,res)=>{
    res.send("this is the home page!!")
})

app.use('/api/todos', require('./routes/todoRoute'))
app.use('/api/photos', require('./routes/photoRoute'))
app.use('/api/posts', require('./routes/postRoute'))
app.use('/api/users', require('./routes/userRoute'))

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, ()=>{console.log(`server runing on ${PORT}`)})
})

mongoose.connection.on('error', err => {
    console.log(err)
})