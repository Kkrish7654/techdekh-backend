import { Request, Response } from "express";
import { connectDatabase } from "../connection/connectDb";
import type { postData } from "../libs/types";

const con = connectDatabase();

//generate slug
function generateSlug(title: string) {
  return title
    ?.toLowerCase() // Convert to lowercase
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^a-zA-Z0-9-]/g, "") // Remove non-alphanumeric characters (except hyphens)
    .substring(0, 50); // Limit the slug to a reasonable length
}

export const createPost = async (req: Request, res: Response) => {
  try {
    const { id, title, description, author, datepPosted }: postData = req.body;
    const slug = generateSlug(title);

    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const thumbnail = req.file.filename;

    const query =
      "INSERT INTO mycollection (id, title, description, author, datepPosted, slug, thumbnail) VALUES (?, ?, ?, ?, ?, ?, ?)";

    con.query(
      query,
      [id, title, description, author, datepPosted, slug, thumbnail],
      (err, result) => {
        if (err) {
          console.error("Failed to insert data:", err);
          return res.status(500).json({ message: "Error inserting data" });
        }

        console.log("Record Inserted", result);
        const newPost = {
          id,
          title,
          description,
          author,
          datepPosted,
          slug,
        };
        return res.status(200).json(newPost);
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getPost = async (req: Request, res: Response) => {
  const query = "SELECT * FROM mycollection;";

  con.query(query, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(501).json({ message: "501 Internal server error" });
    }
    return res.send(result);
  });
};

export const viewPost = (req: Request, res: Response) => {
  const { slug } = req.params;
  const getPost = "SELECT * FROM mycollection";
  con.query(getPost, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ message: "Unable to find post" });
    }
    if (Array.isArray(result)) {
      const foundPost = result.find((element) => element.slug === slug);
      if (foundPost) {
        return res.send(foundPost); // Send the found post as a response
      }
    }

    return res.status(404).json({ message: "Post not found" }); // Send a 404 if the post is not found
  });
};
