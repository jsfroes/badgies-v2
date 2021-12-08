const user_controller = require("./user.controller");
const multer = require("multer");
const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");

let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    console.log("file", file);
    callback(null, "./Uploads/");
  },
  filename: function (req, file, callback) {
    // console.log("multer file:", file);
    callback(null, file.originalname);
  },
});
let maxSize = 1000000 * 1000;
let upload = multer({
  storage: storage,
  limits: {
    fileSize: maxSize,
  },
});

router.get("/", homeController.getHome);
router.post(
  "/create",
  upload.array("multiple_image", 10),
  user_controller.create
);
router.get("/find/:user", user_controller.find);

module.exports = router;
