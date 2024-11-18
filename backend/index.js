const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.use(cors());

//Middleware for post
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/todo")
  .then(() => console.log("DB Success"));
const Activity = mongoose.model("Activity", { name: String }, "activity");

// const activity = ["Apple", "Grape"];

app.get("/activitylist", (req, res) => {
  Activity.find().then(function (retdata) {
    console.log(retdata);
    res.send(retdata);
  });
  //   res.send(activity);
});

app.post("/addactivity", (req, res) => {
  var newactivity = req.body.newactivity;
  //   activity.push(newactivity);
  const newActivity = new Activity({
    name: newactivity,
  });
  newActivity.save().then(() => "Saved Successfully");
});

app.post("/deletetodo", (req, res) => {
  const actid = req.body.id;
  Activity
    .findByIdAndDelete(actid)
    .then(() => {
      res.status(200).send({ message: "Item deleted successfully!" });
      console.log("Deleted successfully!");
    })
    .catch((err) => {
      console.error("Error:", err);
      res.status(500).send({ message: "Failed to delete Item", error: err });
    });
});

app.listen(5000, function () {
  console.log("Server Started...");
});
