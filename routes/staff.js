import { Router } from "express";

import validateExpress from "../middlewares/validateExpress.js";
import { check } from "express-validator";
import { roleValidation, updateEmailValidation, updateRoleValidation } from "../helpers/validations.js";
import { jsonWebTokenMiddleware } from "../jwt/jwt.js";
import { createStaff, updateStaff } from "../controllers/staffsController.js";

const router = Router();

router.get('/create', [
    jsonWebTokenMiddleware,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('roleId').custom(roleValidation),
    validateExpress,
], createStaff);

router.put('/update/:id', [
    jsonWebTokenMiddleware,
    check('email').custom(updateEmailValidation),
    check('roleId').custom(updateRoleValidation),
    validateExpress,
], updateStaff);

export default router;