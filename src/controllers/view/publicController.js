const renderSignUp = (req, res) => {
  res.render("signup");
};

const renderLogin = (req, res) => {
  res.render("login");
};

module.exports = {
  renderSignUp,
  renderLogin,
};
