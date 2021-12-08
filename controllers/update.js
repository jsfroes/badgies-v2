const path = require("path");

const test = (req, res) => {
  return res.render("pages/update", {});
};

module.exports = {
  getTest: test,
};
