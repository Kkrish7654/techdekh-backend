import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors"
import router from "./router/route";
const app = express();
const port: number = 3000;


app.use(cors())
app.use(express.json());
app.use(bodyParser.json())
app.use(router);

app.get("/", (req: Request, res: Response) => {
  res.send("hellsinckjnwkng")
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
