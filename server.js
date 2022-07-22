const mongoose = require("mongoose");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(require("./routes"));

// Connect to Mongoose
mongoose
  .connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/social-mead-ia",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to Mongo");
  })
  .catch((err) => {
    console.log(err);
  });

// Use this to log mongo queries being executed!
mongoose.set("debug", true);

app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));
