import { Router } from "express";
import authRoutes from "../../modules/auth/auth.routes";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to the API!" });
});

router.use("/auth", authRoutes);

export default router;
