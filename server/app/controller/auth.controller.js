import catchAsync from "../utils/catchAsync.js";
import {
  createUser,
  findUserById,
  loginUser,
} from "../services/auth.service.js";

export const register = catchAsync(async (req, res) => {
  const { fullname, email, password } = req.body;

  const user = await createUser(fullname, email, password);

  return res.status(201).json({ message: "User created successfull" });
});

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const data = await loginUser(email, password);

  res.cookie("refreshToken", data.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 Days
  });

  return res.status(200).json({
    message: "Login successful",
    accessToken: data.accessToken,
    // user: data.authUser,
  });
});

export const me = catchAsync(async (req, res) => {
  const { id } = req?.user;

  const user = await findUserById(id);

  return res.status(200).json(user);
});
