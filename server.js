const express = require("express");
const mongoose = require("mongoose");
const vm = require("v-response");
const logger = require("morgan");
const bodyParser = require("body-parser");
const db =
  "mongodb+srv://jsfroes:0058212@streamelements.i06h8.mongodb.net/Badgies-Working?retryWrites=true&w=majority";
const app = express();
const port = process.env.PORT || 9000;
const user_route = require("./user/user.route");
const cors = require("cors");

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

mongoose
  .connect(db, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => vm.log("connected to mongoDB", db))
  .catch((err) => vm.log("error mongodb", err));

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(user_route);

app.listen(port, vm.log("listing on port", port));
