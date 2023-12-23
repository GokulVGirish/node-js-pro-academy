const fs=require("fs")
let movies=JSON.parse(fs.readFileSync("./data/movies.json","utf8"))
//route handler functions
exports.checkId=(req,res,next,value)=>{
    console.log("movie id is "+value)
        let movie=movies.find((element)=>{
        return element.id===value*1

    })
    if(!movie){
         return res.status(404).json({
            status:"fail",
            message:"movie with id"+value+" not found"

        })

    }
    next()

}
exports.validateBody=(req,res,next)=>{
    if(!req.body.name || !req.body.releaseYear){

        return res.status(400).json({
            status:"Fail",
            message:"Not a valid movie data"
        })
    }
    next()

}
exports.getAllMovies=(req,res)=>{
    res.status(200).json({
        status:"success",
        requestedAt:req.requestedAt,
        count:movies.length,
        data:{
            movies:movies
        }
    })

}
exports.getMovie=(req,res)=>{
    const id=req.params.id*1
        let movie=movies.find((element)=>{
        return element.id===id

    })
    // if(!movie){
    //      return res.status(404).json({
    //         status:"fail",
    //         message:"movie with id"+id+" not found"

    //     })

    // }
    res.status(200).json({
        status:"success",
        data:{
            movie:movie
        }
    })

}
exports.createMovie=(req,res)=>{
    const newId =movies[movies.length-1].id + 1
    const newMovie=Object.assign({id:newId},req.body)
    movies.push(newMovie)
    fs.writeFile("./data/movies.json",JSON.stringify(movies),(err)=>{
        res.status(201).json({
            status:"success",
            data:{
                movie:newMovie
            }
        })

    })

}
exports.updateMovie=(req,res)=>{
    let id=req.params.id*1
    let movieToUpdate=movies.find((element)=>{
        return element.id===id
    })
    // if(!movieToUpdate){
    //     return res.status(404).json({
    //         status:"fail",
    //         message:"No movie object with id "+id+" not found"

    //     })
    // }
    let index=movies.indexOf(movieToUpdate)
    Object.assign(movieToUpdate,req.body)
    movies[index]=movieToUpdate
    fs.writeFile("./data/movies.json",JSON.stringify(movies),(err)=>{
        res.status(200).json({
            status:"success",
            data:{
                movie:movieToUpdate
            }
        })

    })
    
}
exports.deleteMovie=(req,res)=>{
    const id=req.params.id * 1
    const movieToDelete=movies.find((element)=>{
        return element.id===id
    })
    // if(!movieToDelete){
    //     return res.status(404).json({
    //         status:"fail",
    //         message:"No movie object with id "+id+" not found"

    //     })
    // }
    const index=movies.indexOf(movieToDelete)
    movies.splice(index,1)
    fs.writeFile("./data/movies.json",JSON.stringify(movies),(err)=>{
        res.status(204).json({
            status:"success",
            data:{
                movie:null
            }
        })

    })

}