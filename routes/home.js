import { Router } from "express";
import { ContactedAndFollowing, addLeadPage, adminPage, homePage, leadPage, myLeadPage, viewAdminPage } from "../controllers/homeController.js";
import { role } from "../middlewares/validations.js";

const router = Router();

router.get('/', homePage);

router.get('/leads/view/:id',  leadPage);
router.get('/leads/new', role, addLeadPage);
router.get('/leads/my-leads', myLeadPage);

router.get('/administration', role, adminPage);
router.get('/administration/view/seller/:id', role, viewAdminPage);

router.get('/contacted-following', role, ContactedAndFollowing);

export default router;