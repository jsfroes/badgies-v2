const user_model = require("./user.model");
const _ = require("underscore");
const fs = require("fs");
const upload = require("../helper/helper").upload;
const vm = require("v-response");
const path = require("path");

exports.create = async (req, res, next) => {
  if (!req.files || _.isEmpty(req.files)) {
    return res
      .status(400)
      .json(vm.ApiResponse(false, 400, "No file uploaded'"));
  }

  const files = req.files;

  // validate file quantity
  if (req.files.length <= 0) {
    return res
      .status(400)
      .send({ message: "You must select at least 1 file." });
  }

  try {
    let urls = [];
    let multiple = async (path) => await upload(path);
    for (const file of files) {
      const { path } = file;
      console.log("path", file);

      const newPath = await multiple(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }
    if (urls) {
      let body = req.body;

      let bodyw = _.extend(body, {
        name: req.body.name,
        multiple_image: urls,
        role: req.body.role,
      });

      const foundUser = await user_model.findOne({ name: req.body.name });

      if (foundUser) {
        return res.render("pages/update", {
          name: req.body.name,
          role: req.body.role,
          multiple_image: req.body.multiple_image,
        });
        
      } else {
        let new_user = new user_model(bodyw);
        await new_user
          .save()
          .then((saved) => {
            console.log(saved);
          })
          .catch((error) => {
            return res.json(error);
          });

        return res.render(`pages/success.html`, {});
      }
    }
    if (!urls) {
      return res.status(400).json(vm.ApiResponse(false, 400, ""));
    }
  } catch (e) {
    console.log("err :", e);
    return next(e);
  }
};

exports.find = (req, res, next) => {
  user_model.findOne({ name: req.params.user }).then((found) => {
    if (!found) {
      return res.status(400).json(vm.ApiResponse(false, 400, ""));
    }
    if (found) {
      return res.status(200).json(vm.ApiResponse(true, 200, "", found));
    }
  });
};
