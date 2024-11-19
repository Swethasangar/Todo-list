const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.use(cors());

//Middleware for post
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/todo")
  .then(() => console.log("DB Connected"));
const Activity = mongoose.model("Activity", { name: String }, "activity");

// const activity = ["Apple", "Grape"];
// console.log(activity)

app.get("/activitylist", (req, res) => {
  // res.send(activity)
  Activity.find().then((retdata) => {
    console.log(retdata);
    res.send(retdata);
  });
});

app.post("/addactivity", (req, res) => {
  var newact = req.body.newactivity;
  // console.log(req.body)
  // activity.push(newact);
  const newActivity = new Activity({
    name: newact,
  });
  newActivity.save().then(() => console.log("Saved Successfully"));
});

app.post("/deleteactivity", (req, res) => {
  const activityId = req.body.id;

  Activity.findByIdAndDelete(activityId)
      .then(() => {
          res.status(200).send({ message: "Activity deleted successfully!" });
          console.log("Deleted successfully!");
      })
      .catch((err) => {
          console.error("Error deleting activity:", err);
          res.status(500).send({ message: "Failed to delete activity", error: err });
      });
});

app.listen(5000, function () {
  console.log("Server Started...");
});
