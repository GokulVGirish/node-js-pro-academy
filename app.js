const express=require("express")
const fs=require("fs")
const morgan=require("morgan")
const moviesRouter=require("./routes/movieRoutes")
const logger=(req,res,next)=>{
    console.log("custom middlewear called")
    next()

}
let app=express()
app.use(express.json())
if(process.env.NODE_ENV==="developement"){
    app.use(morgan("dev"))
}
app.use(express.static("./public"))

app.use(logger)
app.use((req,res,next)=>{
    req.requestedAt =new Date().toISOString()
    next()

})
//USing Routes
app.use("/api/v1/movies",moviesRouter)

module.exports=app