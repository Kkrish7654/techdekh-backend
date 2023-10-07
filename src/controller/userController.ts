import { Response, Request } from "express";
import { connectDatabase } from "../connection/connectDb";
import type { Login, User } from "../libs/types";

const con = connectDatabase();

// ------------------------------------CREATE USER---------------------------------------------//
export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password }: User = req.body;

    const userData: User = {
      username,
      email,
      password,
    };

    const query = "INSERT INTO user SET ?";

    con.query(query, userData, (err, result) => {
      if (err) {
        // If Email is already exist -->
        if (err.code == "ER_DUP_ENTRY" && err.sqlMessage.includes("email")) {
          return res.status(409).send({ message: "Email already exists!" });
        } else {
          console.log("Unable to create user", err);
          return res.status(500).json({ message: "Unable to create user" });
        }
      }
      console.log("User created", result);
      return res.status(200).send({ message: "User created successfully!" });
    });
  } catch (error) {
    console.log(error);
  }
};
// ------------------------------------CREATE USER END---------------------------------------------//

// ------------------------------------GET USER---------------------------------------------//
export const getUser = async (req: Request, res: Response) => {
  try {
    const query = "SELECT * FROM user";

    con.query(query, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "internal server error" });
      }

      if (Array.isArray(result)) {
        const users = result.map((user) => user);
        return res.status(200).json(users);
      }
    });
  } catch (err) {
    console.error(err);
  }
};
// ------------------------------------GET USER END---------------------------------------------//

// ------------------------------------LOGIN USER---------------------------------------------//
export const loginUser = async (req: Request, res: Response) => {
  const { email, password }: Login = req.body;

  try {
    const query = "SELECT * FROM user";

    con.query(query, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (Array.isArray(result)) {
        const users: Login[] = result.map((r) => r);
        let isLoggedIn: boolean = false;

        users.map((user) => {
          if (user?.email === email && user?.password === password) {
            isLoggedIn = true;
          }
        });

        if (isLoggedIn) {
          return res.status(200).json({ message: "User logged in!" });
        } else {
          return res.status(401).json({ message: "Wrong email or password" });
        }
      }
      con.end();
    });
  } catch (err) {
    console.log(err);
  }
};
// ------------------------------------LOGIN USER END---------------------------------------------//
