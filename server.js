const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.options("*", cors);

const db = require("./models");
db.sequelize.sync();



// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

// set routes

require("./routes/course.routes")(app);
require("./routes/student.routes")(app);
require("./routes/degree.routes")(app);
require("./routes/semester.routes")(app);
require("./routes/studentcourse.routes")(app);
require("./routes/advisor.routes")(app);
require("./routes/auth.routes")(app);
require("./routes/degreecourse.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});