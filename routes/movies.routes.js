const router = require("express").Router();
const MovieModel = require("../models/Movie.model")
const CelebrityModel = require("../models/Celebrity.model")

//CREATE MOVIE ---get "/movies/create"
router.get("/create", (req, res, next)=>{

    CelebrityModel.find().select("name")
    .then((celebrity) => {
        res.render("movies/new-movies.hbs", {
            listCelebrity: celebrity
        })
    })
    .catch((err) => {
        next(err)
    })   
 
 })
 
 //POST => añadir a la DB la peli que te inventes
 router.post("/create", (req, res, next)=>{
 
     console.log(req.body)
     const { title, genre, plot, cast } = req.body
 
 
     MovieModel.create({
         title, 
         genre, 
         plot, 
         cast
     })
     .then(()=>{
         res.redirect("/movies")
     })
     .catch((err)=>{
         next(err)
     })
 
 })

 //GET => lista de peliculas
router.get("/",(req, res, next)=>{

    MovieModel.find().select("title")
    .then((movie)=>{
        res.render("movies/movies.hbs", {
            movie
        })
        
    })
    .catch((err)=>{
        next(err)
    })
})




module.exports = router;