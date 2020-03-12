var express = require("express");
var app = express();
var user = require("./controllers/usercontroller");
var finder = require("./controllers/findercontroller");
var seeker = require("./controllers/seekercontroller");
var sequelize = require('./db')


sequelize.sync();

app.use(express.json())

//testing nodemon and postman connection to app.js SUCCESS
app.use("/test", function(req, res) {
  res.send("This is a test for the app.js file with endpoint /test");
});


app.use("/user", user);
app.use("/finder", finder);
app.use("/seeker", seeker);

app.listen(3000, function() {
  console.log("App is now listening on 3000");
});
