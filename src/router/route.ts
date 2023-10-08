import express from "express";
import multer from "multer";
import {
  createPost,
  getPost,
  viewPost,
} from "../controller/postblogController";
import { createUser, getUser, loginUser } from "../controller/userController";
import path from "path";
import { getPostThumbnail } from "../controller/getPostThumbnail";
import { deletePost } from "../controller/deletePost";

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
}); // Use memory storage for storing images as buffers
const upload = multer({ storage: storage });

router.post("/post", upload.single("image"), createPost);
router.get("/post", getPost);
router.get("/post/:slug/", viewPost);
router.get("/post/:slug/:thumbnail", getPostThumbnail);
router.delete("/post/:id", deletePost);

router.post("/user/signup", createUser);
router.get("/user/getuser", getUser);
router.post("/user/login", loginUser);

export default router;
