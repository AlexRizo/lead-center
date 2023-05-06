import { Router } from "express";
import { homePage } from "../controllers/homeController.js";

const router = Router();

router.get('/', homePage);

export default router;