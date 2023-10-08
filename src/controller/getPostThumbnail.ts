import { Request, Response } from "express";
import path from "path";

export const getPostThumbnail = (req: Request, res: Response) => {
  try {
    const { thumbnail } = req.params;
    const imagePath = path.join(__dirname, "../../public/images", thumbnail);
    console.log(imagePath)
    res.sendFile(imagePath);
  } catch (err) {
    console.log(err);
  }
};
