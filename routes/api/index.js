const router = require("express").Router();

// import all of the API routes to prefix their endpoint names and package them up
const userRoutes = require("./user-routes");
const thoughtRoutes = require("./thought-routes");

// prefix routes created in user-routes and thought-routes
router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

module.exports = router;
