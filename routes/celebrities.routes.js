const router = require("express").Router();
const CelebrityModel = require("../models/Celebrity.model")

//CREATE CELEBRITY ---get "/celebrities/create"
router.get("/create", (req, res, next)=>{

   res.render("celebrities/new-celebrity.hbs")

})

//POST => añadir a la DB la celeb que te inventes
router.post("/", (req, res, next)=>{

    console.log(req.body)
    const {name, occupation, catchPhrase} = req.body


    CelebrityModel.create({
        name, 
        occupation, 
        catchPhrase
    })
    .then(()=>{
        res.redirect("celebrities/celebrities.hbs")
    })
    .catch((err)=>{
        next(err)
    })

})


//GET => lista de celebrities
router.get("/",(req, res, next)=>{

    CelebrityModel.find().select("name")
    .then((celebrity)=>{
        res.render("celebrities/celebrities.hbs")
        listCelebrity: celebrity
    })
    .catch((err)=>{
        next(err)
    })


})


module.exports = router;