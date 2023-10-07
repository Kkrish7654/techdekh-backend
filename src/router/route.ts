import express from "express";
import {
  createPost,
  getPost,
  viewPost
} from "../controller/postblogController";
import { createUser, getUser } from "../controller/userController";

const router = express.Router();

router.post("/post", createPost);
router.get("/post", getPost);
router.get("/post/:slug", viewPost);
router.post("/user/signup", createUser)
router.get("/user/login", getUser);


export default router;
