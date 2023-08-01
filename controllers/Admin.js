const admin = require("../models/admin");
const { generateToken } = require("../utils/Token_generator");
const bcrypt = require("bcrypt");

//  Register AdminUser
const registerAdmin = async (req, res, next) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    throw new Error("form is not complete");
  }

  try {
    // check if admin existing
    const adminExists = await admin.findOne({
      email,
      username,
    });

    if (adminExists) {
      throw new Error("Admin has been created already");
    }

    let adminUser = await admin.create({
      username,
      password,
      email,
    });

    return res.json({
      success: true,
      data: {
        isAdmin: adminUser.isAdmin,
        token: generateToken(user._id),
      },
    });
  } catch (err) {
    console.log(err.message);
    return next(err);
  }
};
// login AdminUser
const loginAdmin = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await admin.findOne({ username }).select("+password");

    if (!user) {
      throw new Error("admin dosen't exist");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error("incorrect password");
    }

    const token = generateToken(user._id);
    const Token = token;
    let IsAdmin = true;

    return res.json({
      success: true,
      data: {
        isAdmin: IsAdmin,
        token: Token,
      },
    });
  } catch (err) {
    return next(err);
  }
};

//Update adminPassword

const updateAdminPassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  try {
    if (oldPassword) {
      if (oldPassword !== newPassword) {
        let user = await admin.findById(req.user._id);

        if (!user) {
          res.status(404);
          throw new Error("admin not found");
        }
        const match = bcrypt.compareSync(oldPassword, user.password);

        if (!match) {
          throw new Error("Old password incorrect");
        }

        user.password = newPassword;
        console.log("new password");
        await user.save();
        return res.json({
          data: {
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
          },
          success: true,
        });
      }
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  updateAdminPassword,
};
