import {Request, Response} from "express";
import {secretKey} from "../utils/secretKety";
const jwt = require("jsonwebtoken");
const {Critic} = require("../db/models");

export const getAllCritic = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const dates = await Critic.findAll();

    res.status(200).json(dates);
  } catch (error) {
    res
      .status(500)
      .json({message: "Internal Server Error", error: error.message});
  }
};

export const getCriticByUserId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const dates = await Critic.findAll({
      where: {
        user_id: req.params.user_id,
      },
    });

    if (!dates) {
      res.status(404).json({message: "User not found"});
      return;
    }
    res.status(200).json(dates);
  } catch (error) {
    res
      .status(500)
      .json({message: "Internal Server Error", error: error.message});
  }
};

export const addCritic = async (req: Request, res: Response): Promise<void> => {
  try {
    const {name, description} = req.body;

    const tokenHeader = req.headers.authorization;

    if (!tokenHeader || !tokenHeader.startsWith("Bearer ")) {
      res.status(401).json({message: "Unauthorized"});
      return;
    }

    const token = tokenHeader.split(" ")[1];

    const decodedToken: any = jwt.verify(token, secretKey);

    const user_id = decodedToken.user_id;

    const dates = await Critic.create({
      id: crypto.randomUUID(),
      user_id,
      name,
      description,
    });

    res.status(200).json({message: "Created new critic successfully", dates});
  } catch (error) {
    res
      .status(500)
      .json({message: "internal Server Error", error: error.message});
  }
};

export const deleteCriticById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const dates = await Critic.findByPk(req.params.id);

    if (!dates) {
      res.status(404).json({message: "Critic not found"});
      return;
    }

    await dates.destroy();

    res.status(200).json({message: "deleted succesfuly", dates});
  } catch (error) {
    res
      .status(500)
      .json({message: "Internal Server Error", error: error.message});
  }
};

export const updateCritic = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const dates = await Critic.findByPk(req.params.id);

    if (!dates) {
      res.status(404).json({message: "No date found"});
      return;
    }

    const {name, description} = req.body;

    const newDate = await dates.update({
      name,
      description,
    });

    res.status(200).json({message: "Updated date seccessfullt ", newDate});
  } catch (error) {
    res
      .status(500)
      .json({message: "Internal Server Error", error: error.message});
  }
};
