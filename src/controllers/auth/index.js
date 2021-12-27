const { User } = require("../../models");
const { getPayloadWithValidFieldsOnly } = require("../../helpers");

const signup = async (req, res) => {
  try {
    const payload = getPayloadWithValidFieldsOnly(
      [
        "email",
        "password",
        "first_name",
        "last_name",
        "height",
        "weight",
        "age",
      ],
      req.body
    );

    if (Object.keys(payload).length !== 7) {
      return res.status(400).json({
        success: false,
        error: "Please provide valid fields in post body",
      });
    }

    await User.create(payload);

    return res.json({ success: true, data: "Successfully created a user" });
  } catch (error) {
    console.log(`[ERROR]: Create user failed | ${error.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Failed to create user" });
  }
};

const login = async (req, res) => {
  try {
    const payload = getPayloadWithValidFieldsOnly(
      ["email", "password"],
      req.body
    );

    if (Object.keys(payload).length !== 2) {
      return res.status(400).json({
        success: false,
        error: "Please provide valid fields in post body",
      });
    }

    const user = await User.findOne({ where: { email: payload.email } });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User does not exist",
      });
    }

    const validPassword = await user.checkPassword(payload.password);

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        error: "User not authorized",
      });
    }

    const userInSession = {
      id: user.get("id"),
      email: user.get("email"),
      firstName: user.get("first_name"),
      lastName: user.get("last_name"),
    };

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user = userInSession;

      return res.json({ success: true, data: "Login successful" });
    });
  } catch (error) {
    console.log(`[ERROR]: Login user failed | ${error.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Failed to login user" });
  }
};

module.exports = {
  signup,
  login,
};
