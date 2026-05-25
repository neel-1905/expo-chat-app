import express from "express";
import cors from "cors";
import v1Routes from "./routes/v1";
import { errorMiddleware } from "./middleware/error.middleware";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1", v1Routes);

app.get("/", (_, res) => {
  res.send(`App is working`);
});

app.use(errorMiddleware);

export default app;
