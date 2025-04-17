import express from "express";
import dotenv from "dotenv";
import productRouter from "./routes/product/product.routes.js";
import { dbConnect } from "./database/dbConnect.js";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 8001;
const clientUrl = process.env.CLIENT_URL;

dbConnect();

app.use(express.json());
app.use(
  cors({
    origin: clientUrl,
    credentials: true,
  })
);

app.use("/api/product", productRouter);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
