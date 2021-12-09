const user_model = require("./user.model");
const _ = require("underscore");
const fs = require("fs");
const upload = require("../helper/helper").upload;
const vm = require("v-response");
const path = require("path");

let name;
let badges;
let role;

exports.create = async (req, res, next) => {
  // if (!req.files || _.isEmpty(req.files)) {
  //   return res
  //     .status(400)
  //     .json(vm.ApiResponse(false, 400, "No file uploaded'"));
  // }

  // validate file quantity
  // if (req.files.length <= 0) {
  //   return res
  //     .status(400)
  //     .send({ message: "You must select at least 1 file." });
  // }

  try {
    if (req.files) {
      const files = req.files;
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
          query: req.body.name.toLowerCase(),
        });

        const foundUser = await user_model.findOne({
          query: req.body.name.toLowerCase(),
        });

        if (foundUser) {
          name = foundUser.name;
          role = foundUser.role;
          query = foundUser.name.toLowerCase();
          badges = foundUser.multiple_image;
          return res.render("pages/user", {
            name,
            role,
            badges,
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

          return res.render(`pages/success`, {});
        }
      }
      if (!urls) {
        return res.status(400).json(vm.ApiResponse(false, 400, ""));
      }
    } else {
      const foundUser = await user_model.findOne({
        query: req.body.name.toLowerCase(),
      });

      if (foundUser) {
        name = foundUser.name;
        qiery = foundUser.name.toLowerCase();
        role = foundUser.role;
        return res.render("pages/user", {
          name,
          role,
        });
      } else {
        let new_user = new user_model({
          name: req.body.name,
          role: req.body.role,
          query: req.body.name.toLowerCase(),
        });
        await new_user
          .save()
          .then((saved) => {
            console.log(saved);
          })
          .catch((error) => {
            return res.json(error);
          });

        return res.render(`pages/success`, {});
      }
    }
  } catch (e) {
    console.log("err :", e);
    return next(e);
  }
};

exports.find = (req, res, next) => {
  user_model.findOne({ query: req.params.user }).then((found) => {
    if (!found) {
      return res.status(400).json(vm.ApiResponse(false, 400, ""));
    }
    if (found) {
      return res.status(200).json(vm.ApiResponse(true, 200, "", found));
    }
  });
};
exports.update = async (req, res, next) => {
  // if (!req.files || _.isEmpty(req.files)) {
  //   return res
  //     .status(400)
  //     .json(vm.ApiResponse(false, 400, "No file uploaded'"));
  // }

  const files = req.files;

  // validate file quantity
  // if (req.files.length <= 0) {
  //   return res
  //     .status(400)
  //     .send({ message: "You must select at least 1 file." });
  // }

  try {
    if (req.files) {
      const files = req.files;
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
          query: req.body.name.toLowerCase(),
        });

        user_model
          .findOneAndUpdate({ query: req.body.name.toLowerCase() }, bodyw)
          .then((saved) => {
            console.log(saved);
            return res.render(`pages/updated`, {});
          })
          .catch((error) => {
            return res.json(error);
          });
      }
      if (!urls) {
        return res.status(400).json(vm.ApiResponse(false, 400, ""));
      }
    } else {
      user_model
        .findOneAndUpdate(
          { query: req.body.name.toLowerCase() },
          {
            name: req.body.name,
            query: req.body.name.toLowerCase(),
            role: req.body.role,
          }
        )
        .then((saved) => {
          console.log(saved);
          return res.render(`pages/updated`, {});
        })
        .catch((error) => {
          return res.json(error);
        });
    }
  } catch (e) {
    console.log("err :", e);
    return next(e);
  }
};
