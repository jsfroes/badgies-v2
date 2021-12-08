const path = require("path");

const test = (req, res) => {
  return res.sendFile(path.join(`${__dirname}/../views/test.html`));
};

module.exports = {
  getTest: test,
};
