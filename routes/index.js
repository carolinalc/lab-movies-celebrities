const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

const celebritiesRoutes = require("./celebrities.routes")
router.use("/celebrities", celebritiesRoutes)

const moviesRouter = require("./movies.routes")
router.use("/movies", moviesRouter)

module.exports = router;
