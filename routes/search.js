import { Router } from "express";
import { jsonWebTokenMiddleware } from "../jwt/jwt.js";
import { searchPage, searchBy } from "../controllers/searchController.js";

const router = Router();

router.get('/', searchPage);

router.get('/leads/by', [jsonWebTokenMiddleware], searchBy);

export default router;