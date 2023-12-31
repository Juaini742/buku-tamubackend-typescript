import {Request, Response} from "express";
import {passwordHashing} from "../utils/hashingPassword";
import {secretKey} from "../utils/secretKety";
import {uploadImage} from "../utils/uploadImage";
const {User, User_details} = require("../db/models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

export const getUser = async (_req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.status(200).json({users});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

export const getUserByToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      res.status(401).json({error: "Token not provided"});
      return;
    }
    const decoded = jwt.verify(token, secretKey);

    const user_id = (decoded as any).user_id;

    const userDetails = await User_details.findOne({where: {user_id}});

    if (!userDetails) {
      res.status(404).json({error: "User details not found"});
      return;
    }

    const user = await User.findByPk(user_id);

    if (!user) {
      res.status(404).json({error: "User not found"});
      return;
    }

    res.status(200).json({user});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const {username, email, role, password} = req.body;
    const newPassword: string = await passwordHashing(password);

    const user = await User.create({
      id: crypto.randomUUID(),
      username,
      email,
      role,
      password: newPassword,
    });

    const newUser = {
      username: user.username,
      email: user.email,
    };

    res.status(200).json({
      message: "Registered successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const {email, role, password} = req.body;
    const user = await User.findOne({where: {email}});
    const userRole = await User.findOne({where: {role}});

    if (!user) {
      res.status(403).json({message: "User not found"});
      return;
    }

    if (!userRole) {
      res.status(403).json({message: "User not found"});
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(403).json({message: "Email or Password incorrect"});
      return;
    }

    const token: string = jwt.sign({user_id: user.id}, secretKey, {
      expiresIn: "1h",
    });

    await User_details.create({
      id: crypto.randomUUID(),
      user_id: user.id,
      token,
    });

    res.cookie("refreshToken", token, {
      // httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res
      .status(200)
      // .header("refreshToken", `Bearer ${token}`)
      .json({message: "Login Successfully", role: user.role, token: token});
  } catch (error) {
    res
      .status(500)
      .json({error: "Internal Server Error", message: error.message});
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  const token = req.headers.authorization;
  try {
    const deleteUser = await User_details.destroy({
      where: {token: token?.split(" ")[1]},
    });
    if (deleteUser > 0) {
      res.json({success: true, message: "Logout successful"});
    } else {
      res
        .status(404)
        .json({error: "User detail not found for the provided token"});
    }
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      res.status(404).json({message: "User not found"});
      return;
    }

    const {username, email} = req.body;
    let avatarUrl = user.file;
    const file = req.file;

    if (file) {
      avatarUrl = await uploadImage(file.buffer, file.originalname);
    }

    await user.update({
      file: avatarUrl,
      username,
      email,
    });

    const newUser = {
      file: user.file,
      username: user.username,
      email: user.email,
    };

    res.status(200).json({message: "User updated successfully", data: newUser});
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({error: "Internal Server Error", message: error.message});
  }
};
