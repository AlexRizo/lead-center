import { check } from "express-validator";
import validateExpress from "../middlewares/validateExpress.js";
import { login, renewToken } from "../controllers/authController.js";
import { Router } from "express";
import { jsonWebTokenMiddleware } from "../jwt/jwt.js";

const router = Router();

router.post('/login', [
    check('email', 'El correo es obligatorio.').not().isEmpty(),
    check('password', 'La contraseña es obligatoria.').not().isEmpty(),
    validateExpress
], login);

router.get('/', jsonWebTokenMiddleware, renewToken);


export default router;