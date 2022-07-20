const router = require("express").Router();

// import API calls from controllers/user-controller
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  // move to seperate route?
  addFriend,
  deleteFriend,
} = require("../../controllers/user-controller");

// Set up GET all and POST at /api/users
router.route("/").get(getAllUsers).post(createUser);

// Set up GET one, PUT, and DELETE at /api/users/:id
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

// Set up POST and DELETE at /api/users/:id/friends/:friendId
router.route("/id/friends/:friendId").post(addFriend).delete(deleteFriend);


module.exports = router;
