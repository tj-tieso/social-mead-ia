const { User } = require("../models");

// REQUIRED ROUTES
// getAllUsers, getUserById, createUser, updateUser, deleteUser, addfriend, deleteFriend

const userController = {
  getAllUsers(req, res) {
    User.find({})
      .select("-__v")
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get User by Id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .select("-__v")
      .populate("thoughts")
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No User found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // Create User
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },

  updateUser({ params, body }, res) {
    // finds single document to update, then updates it and returns updated document
    // If we don't set the parameter, { new: true }, it will return the original document.
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "Nope. No User found with this id" });
          return;
        }
        res.json({ message: "User updated!" });
      })
      .catch((err) => res.status(400).json(err));
  },

  // Delete User
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "Nope. No User found with this id" });
          return;
        }
        res.json({ message: "User deleted!" });
      })
      .catch((err) => res.status(400).json(err));
  },

  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $push: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          return res
            .status(404)
            .json({ message: "No User found with that id!" });
        }
        res.json({ message: "Must be nice to have friends!" });
      })
      .catch((err) => res.status(400).json(err));
  },

  deleteFriend({ params }, res) {
    console.log(params.id);
    console.log(params.friendId);
    User.findOneAndUpdate(
      { _id: params.id },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          return res
            .status(404)
            .json({ message: "Error, please check paramaters!" });
        }
        res.json({ message: "Friend has been deleted" });
      })
      .catch((err) => res.json(err));
  },
};

module.exports = userController;
