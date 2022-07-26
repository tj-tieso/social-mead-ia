const router = require("express").Router();

// import API calls from controllers/user-controller
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thought-controller");

// Set up GET all and POST at /api/users
router.route("/").get(getAllThoughts).post(createThought);

// Set up GET one, PUT, and DELETE at /api/Thoughts/:id
router
  .route("/:id")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

router.route("/:thoughtId").post(addReaction);

router.route("/:thoughtId/:reactionId").delete(deleteReaction);

module.exports = router;
