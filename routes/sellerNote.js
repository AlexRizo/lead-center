import { Router } from "express";

import validateExpress from "../middlewares/validateExpress.js";
import { check } from "express-validator";
import { jsonWebTokenMiddleware } from "../jwt/jwt.js";
import { createSellerNote, getLeadNotes } from "../controllers/sellerNotes.js";

const router = Router();

router.get('/get/lead-notes', jsonWebTokenMiddleware, getLeadNotes);

router.post('/create/note', [
    jsonWebTokenMiddleware,
    check('name', 'La nota es obligatoria.').not().isEmpty(),
    check('name', 'La nota no es válida').isLength({ max: 500 }),
    validateExpress
], createSellerNote);

export default router;