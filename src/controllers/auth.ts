import { RequestHandler } from "express";
import { SECRET } from "../app";
import User, { IUser } from "../models/User";
import jwt from "jsonwebtoken";

function createToken(user: IUser) {
  return jwt.sign({ _id: user._id, email: user.email }, SECRET, {
    expiresIn: 86400,
  });
}

//@Route    Post api/users
//@desc     Register new user
//@access   Public
export const register: RequestHandler = async (req, res) => {
  // Destructuring Request Body
  const { fullName, userName, email, password } = req.body;

  // Try save user and verify is not exist
  try {
    // Verify if content is not empty
    if (!fullName || !userName || !email || !password) {
      return res.status(400).json({ errors: [{ msg: "Fill all data." }] });
    }

    // Search User if exist
    let userExist = await User.findOne({ email });

    // If User exist then not register a new user
    if (userExist) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Email already in use." }] });
    }

    // If User not exist then we creating the object user
    const user: IUser = new User({
      fullName,
      userName,
      email,
      password,
    });

    // Encrypt user password
    user.password = await user.encryptPassword(user.password);

    // Save User
    await user.save();

    // Generating Token
    return res.status(200).json({ token: createToken(user) });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
};

//@Route    POST api/auth
//@desc     Authenticate user & get token
//@access   Public
export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(401)
        .json({ errors: [{ msg: "Pls send your email and password" }] });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ errors: [{ msg: "User Not exist" }] });
    }
    // Validating Password
    const isMatch = await user.validatePassword(password);

    if (isMatch) {
      // Get Token
      return res.status(200).json({ token: createToken(user) });
    }

    return res
      .status(401)
      .json({ errors: [{ msg: "Email or password invalid" }] });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
};

//@Route    GET api/auth
//@desc     Get Personal Info of Logged User
//@access   Public
export const getMe: RequestHandler = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(400).json({ msg: "There is no user" });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
};
