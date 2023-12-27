import {Request, Response} from "express";
import {secretKey} from "../utils/secretKety";
import {uploadImage} from "../utils/uploadImage";
const jwt = require("jsonwebtoken");
const {Guest} = require("../db/models");

export const getAllGuets = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const guests = await Guest.findAll();
    res.status(200).json({guests});
  } catch (error) {
    res
      .status(500)
      .json({message: "internal Server Error", error: error.message});
  }
};

export const addGuest = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      name,
      born,
      age,
      ktp,
      phone,
      educate,
      prov,
      kab,
      kec,
      kel,
      address,
      data,
    } = req.body;

    const tokenHeader = req.headers.authorization;

    if (!tokenHeader || !tokenHeader.startsWith("Bearer ")) {
      res.status(401).json({message: "Unauthorized"});
      return;
    }

    const token = tokenHeader.split(" ")[1];

    const decodedToken: any = jwt.verify(token, secretKey);

    const user_id = decodedToken.user_id;
    const id = crypto.randomUUID();
    let photoUrl = "";

    const file = req.file;

    if (file) {
      photoUrl = await uploadImage(file.buffer, file.originalname);
    }

    const guest = await Guest.create({
      id,
      user_id,
      name,
      born,
      age,
      ktp,
      phone,
      educate,
      prov,
      kab,
      kec,
      kel,
      address,
      data,
      file: photoUrl,
    });

    res.status(200).json({guest});
  } catch (error) {
    res
      .status(500)
      .json({message: "Internal Server Error", error: error.message});
  }
};

export const getGuestByUserId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const guest = await Guest.findAll({
      where: {
        user_id: req.params.user_id,
      },
    });

    if (!guest) {
      res.status(404).json({message: "Data not found"});
      return;
    }

    res.status(200).json({guest});
  } catch (error) {
    res
      .status(500)
      .json({message: "Internal Server Error", error: error.message});
  }
};

export const deleteGuestById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const guest = await Guest.findByPk(req.params.id);

    if (!guest) {
      res.status(404).json({message: "Data not found"});
      return;
    }

    await guest.destroy();

    res.status(200).json({message: "Deleted successfully", guest});
  } catch (error) {
    res
      .status(500)
      .json({message: "Internal Server Error", error: error.message});
  }
};
