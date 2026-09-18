import bcrypt from "bcrypt";

import User from "../models/user.model.js";
import { AppError } from "../utils/error.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";

export async function isEmailExist(email) {
  if (!email) {
    throw new Error("Email is required");
  }

  const user = await User.findOne({ email });

  if (user) {
    return true;
  }

  return false;
}

export async function createUser(fullname, email, password) {
  if (!fullname || !email || !password) {
    throw new Error("Invalid request. Please fill required data");
  }

  const userAlreadyExist = await isEmailExist(email);

  if (userAlreadyExist) {
    throw new AppError(409, "Email already Exist");
    // throw new Error("User already exist with this email")
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    fullname: fullname,
    email: email,
    password: hashedPassword,
  });

  if (!user) {
    throw new Error("Failed to create user");
  }

  return user;
}

export async function loginUser(email, password) {
  if (!email || !password) {
    throw new AppError(400, "Invalid request, Fill all required fields");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(404, "User Not Found");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  console.log(isPasswordMatch, "---Password---")

  if (!isPasswordMatch) {
    throw new AppError(401, "Email or password is incorrect")
  }

  const accessToken = await generateAccessToken({
    id: user?._id,
    email: user?.email,
  });

  const refreshToken = await generateRefreshToken({
    id: user?._id,
    email: user?.email,
  });

  const authUser = {
    id: user?._id,
    fullname: user?.fullname,
    email: user?.email
  }

  console.log(authUser, accessToken, refreshToken);
  

  return { authUser, accessToken, refreshToken };
}

export async function findUserById(userId){

  const user = await User.findById(userId).select("-password")

  if(!user){
    throw new AppError(404, "User Not Found");
  };

  return user;

}
