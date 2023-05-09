import { Router } from "express";
import { addLeadPage, adminPage, homePage, leadPage, myLeadPage } from "../controllers/homeController.js";
import role from "../middlewares/role.js";

const router = Router();

router.get('/', homePage);

router.get('/leads/view/:id', leadPage);
router.get('/leads/new', addLeadPage);
router.get('/leads/my-leads', myLeadPage);

router.get('/administration', role, adminPage);

export default router;