import { Router } from "express";
import { addLeadPage, homePage, leadPage } from "../controllers/homeController.js";

const router = Router();

router.get('/', homePage);

router.get('/leads/view/:id', leadPage);
router.get('/leads/new', addLeadPage);

export default router;