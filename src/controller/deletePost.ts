import { Request, Response } from "express";
import { connectDatabase } from "../connection/connectDb";
import type { postData } from "../libs/types";

export const deletePost = (req: Request, res: Response) => {
  const con = connectDatabase();
  try {
    const { id } = req.params;
    console.log(id, "polo");
    const query = `DELETE FROM mycollection WHERE id = ?`;
    const getPostDeleted = new Promise((resolve, reject) => {
      con.query(query, [id], (err, result) => {
        if (err) {
          console.error("Failed to get data:", err);
          reject({ status: 500, message: "Internal server error!" });
        } else if (Array.isArray(result)) {
          const deletePost = result.find(
            (post: postData) => post.id === Number(id)
          );
          if (deletePost) {
            resolve({ status: 200, message: "Post deleted successfully!" });
          } else {
            reject({ status: 404, message: "Post not found!" });
          }
        } else {
          resolve({ status: 200, message: "post deleted" });
        }
      });
    });

    getPostDeleted
      .then((response: { status: number; message: string }) => {
        res.status(response.status).json({ message: response.message });
      })
      .catch((error: { status: number; message: string }) => {
        res.status(error.status).json({ message: error.message });
      });
  } catch (err) {
    console.log(err);
  }
};
