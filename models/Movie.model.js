//  Add your code here
const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({

    title: {
        type: String
    },
    genre:{
        type: String
    },
    plot: {
        type: String
    },
    cast: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "celebrities", //el nombre del modelo
    }]

})


const MovieModel = mongoose.model("movies", movieSchema)

module.exports = MovieModel;