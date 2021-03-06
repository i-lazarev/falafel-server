const mongoose = require("mongoose");
const User = require("./Models/user.model");
require("dotenv").config();

// CONNECT TO MONGODB
mongoose.connect(
  "mongodb+srv://alef:hello123@cluster0-2yq8x.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  },
  err => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection: " + err);
    }
  }
);




module.exports = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  User.findOne({ username: req.query.username })
    .then(user => {
      user.udi = {
        date: req.query.date,
        calCount: 0,
        proteinCount: 0,
        fatCount: 0,
        carbsCount: 0,
        waterCount: 0,
        caffCount: 0,
        sugarCount: 0
      };
      user.save();
      res.json('udi reset Succeeded');
    })
    .catch(err => res.status(400).json("Error: " + err));

}