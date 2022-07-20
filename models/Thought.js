const { Schema, model, Types } = require("mongoose");

const dateFormat = require("../utils/dateFormat");

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: [
        280,
        "Max Characters alllowed for a reaction are 280. You currently have {VALUE} characters",
      ],
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false,
  }
);

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: "Please fill out your thought!",
      minLength: [1, "Thoughts must be at least 1 character long"],
      max: [
        280,
        "Max characters allowed are 280. You currently have {VALUE} characters",
      ],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    // the user that created this thought
    username: {
      type: String,
      required: "Username is required",
    },
    // Array of nested documents created with the reactionSchema
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false,
  }
);

// Create virtual called reactionCount that retrieves the length of the thought's reactions array field on query
ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// create Thought Model using Thought Schema
const Thought = model("Thought", ThoughtSchema);

// export Thought Model
module.exports = Thought;
