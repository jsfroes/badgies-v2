const cloudinary = require("cloudinary");
const _ = require("underscore");

const Q = require("q");

function upload(file) {
  cloudinary.config({
    cloud_name: "dbh1atwnz",
    api_key: "644196858577728",
    api_secret: "Qcc1SrqOUn16_WYSBooQq39s-Oo",
  });

  return new Q.Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(
      file,
      { width: 50, height: 50 },
      (err, res) => {
        if (err) {
          console.log("cloudinary err:", err);
          reject(err);
        } else {
          console.log("cloudinary res:", res);
          return resolve(res.secure_url);
        }
      }
    );
  });
}

module.exports.upload = upload;
