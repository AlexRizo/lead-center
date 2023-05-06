import { Router } from "express";
import { check } from "express-validator";
import { createUser, createUserByZapier, deleteUser, getUsers, updateUser } from "../controllers/usersController.js";
import validateExpress from "../middlewares/validateExpress.js";
import { jsonWebTokenMiddleware } from "../jwt/jwt.js";

const router = Router();

router.get('/get-pending', jsonWebTokenMiddleware, getUsers);

router.post('/create/zapier/api', [
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    check('email', 'El email es obligatorio.').not().isEmpty(),
    check('email', 'El email no es correcto.').isEmail(),
    check('city', 'la cuidad es obligatoria.').not().isEmpty(),
    check('phone_number', 'El teléfono es obligatorio.').not().isEmpty(),
    check('phone_number', 'El teléfono no es valido.').isMobilePhone(),
    check('reason', 'El motivo es obligatorio.').not().isEmpty(),
    check('date_contact', 'la fecha de contacto es obligatoria.').not().isEmpty(),
    check('originId', 'El origen es obligatorio.').not().isEmpty(),
    check('platformId', 'la plataforma es obligatoria.').not().isEmpty(),
    validateExpress,
], createUserByZapier);

router.post('/create', [
    jsonWebTokenMiddleware,
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    check('email', 'El email es obligatorio.').not().isEmpty(),
    check('email', 'El email no es correcto.').isEmail(),
    check('city', 'la cuidad es obligatoria.').not().isEmpty(),
    check('phone_number', 'El teléfono es obligatorio.').not().isEmpty(),
    check('phone_number', 'El teléfono no es valido.').isMobilePhone(),
    check('reason', 'El motivo es obligatorio.').not().isEmpty(),
    check('date_contact', 'la fecha de contacto es obligatoria.').not().isEmpty(),
    check('originId', 'El origen es obligatorio.').not().isEmpty(),
    check('platformId', 'la plataforma es obligatoria.').not().isEmpty(),
    validateExpress,
], createUser);

router.put('/update/:id', [
    jsonWebTokenMiddleware,
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    check('email', 'El email es obligatorio.').not().isEmpty(),
    check('email', 'El email no es correcto.').isEmail(),
    check('city', 'la cuidad es obligatoria.').not().isEmpty(),
    check('phone_number', 'El teléfono es obligatorio.').not().isEmpty(),
    check('phone_number', 'El teléfono no es valido.').isMobilePhone(),
    check('reason', 'El motivo es obligatorio.').not().isEmpty(),
    check('date_contact', 'la fecha de contacto es obligatoria.').not().isEmpty(),
    check('contact_status', 'Dato incorrecto').isNumeric(),
    check('originId', 'El origen es obligatorio.').not().isEmpty(),
    check('platformId', 'la plataforma es obligatorio.').not().isEmpty(),

    check('name', 'Limite de caracteres superado').isLength({ max: 100 }),
    check('email', 'El email es obligatorio.').isLength({ max: 100 }),
    check('city', 'la cuidad es obligatoria.').isLength({ max: 100 }),
    check('phone_number', 'El teléfono es obligatorio.').isLength({ max: 15 }),
    check('reason', 'El motivo es obligatorio.').isLength({ max: 500 }),
    check('date_contact', 'la fecha de contacto es obligatoria.').isLength({ max: 10 }),
    check('originId', 'El origen es obligatorio.').isNumeric(),
    check('platformId', 'la plataforma es obligatorio.').isNumeric(),

    validateExpress,
], updateUser);

router.delete('/delete/:id', jsonWebTokenMiddleware, deleteUser); 

export default router;