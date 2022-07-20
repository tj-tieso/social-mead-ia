const { Schema, model } = require("mongoose");

// import validate email function from utils
const validateEmail = require("../utils/validateEmail");

//create a schema, using the Schema constructor imported from Mongoose
const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      required: "Username is required",
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: "Email is required",
      validate: [validateEmail, "Please provide a valid email addres"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    // // Array of _id values referencing the Thought model
    // thoughts: [],
    // // Array of _id values referencing the User model (self-reference)
    // friends: [],
  },
  {
    toJSON: {
      virtuals: true,
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false,
  }
);

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
// UserSchema.virtual("friendCount").get(function(){})

// create User Model using User Schema
const User = model("User", UserSchema);

// export User Model
module.exports = User;
