import { Router } from "express";
import { addLeadPage, homePage, leadPage, myLeadPage } from "../controllers/homeController.js";

const router = Router();

router.get('/', homePage);

router.get('/leads/view/:id', leadPage);
router.get('/leads/new', addLeadPage);
router.get('/leads/my-leads', myLeadPage);

export default router;