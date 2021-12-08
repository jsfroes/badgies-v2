const user = (req, res) => {
  return res.render("pages/user", {});
};

module.exports = {
  getUser: user,
};
