import { Router } from "express";
import { auth } from "./viewsRouter.js";
import { passportCall } from "../utils.js";
export const router = Router();

router.get("/", passportCall('jwt'),(req, res) => {
  try {
    res.status(200).render("chat");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
