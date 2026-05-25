import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (_, res) => {
  res.send(`App is working`);
});

export default app;
