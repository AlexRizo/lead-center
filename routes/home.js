import { Router } from "express";
import { homePage, leadPage } from "../controllers/homeController.js";

const router = Router();

router.get('/', homePage);

router.get('/leads/view/:id', leadPage);

export default router;