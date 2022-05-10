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

//GET => ruta dinamica de pelis
router.get("/:id", (req, res, next) =>{

    const {id} = req.params

    MovieModel.findById(id).populate("cast")
    .then((movie) =>{
        res.render("movies/movies-details.hbs", {
            movie
        })  
    })
    .catch((err) => {
        next(err)
      })
})


//POST "/movies/:id/delete" ruta para eliminar peli
router.post("/:id/delete", (req, res, next) =>{

    const {id} = req.params

    MovieModel.findByIdAndDelete(id)
    .then(()=>{

        res.redirect("/movies")
    })
    .catch((err) => {
        next(err)
      })

})


//get y post para editar pelis "/movies/:id/edit"
router.get("/:id/edit", (req, res, next)=>{

    const{id}= req.params
    
    MovieModel.findById()
    .then((movie)=>{
        res.render("movies/edit-movie.hbs", {
            movie
        })
    })
    .catch((err) => {
        next(err)
      })


})

router.post("/:id/edit", (req, res, next)=>{

    const{id}= req.params
    const { title, genre, plot, cast } = req.body
    
    MovieModel.findByIdAndUpdate(id,{
        title, 
        genre, 
        plot, 
        cast
    })
    .then((movie)=>{
        res.redirect(`/movies/${id}/details`)
    })
    .catch((err) => {
        next(err)
      })


})


module.exports = router;