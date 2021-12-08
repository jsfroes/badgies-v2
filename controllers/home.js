const path = require("path");

const home = (req, res) => {
  return res.render("pages/index", {});
};

module.exports = {
  getHome: home,
};
