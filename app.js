require('dotenv').config();
var express = require("express");
var app = express();
var user = require("./controllers/usercontroller");
var finder = require("./controllers/findercontroller");
var seeker = require("./controllers/seekercontroller");
var sequelize = require('./db')


sequelize.sync();
app.use(express.json())
app.use(require('./middleware/headers'))

//testing nodemon and postman connection to app.js SUCCESS
app.use("/test", function(req, res) {
  res.send("This is a test for the app.js file with endpoint /test");
});

//EXPOSED ROUTES GO BELOW

app.use("/user", user);
app.use("/finder", finder);
app.use("/seeker", seeker);
//PROTECTED ROUTES WITH AUTH GO BELOW
app.use(require('./middleware/validate-session'))



app.listen(3000, function() {
  console.log("App is now listening on 3000");
});
