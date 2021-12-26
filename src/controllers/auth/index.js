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

module.exports = {
  signup,
};
