import { validationResult } from "express-validator"

const validateExpress = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            res: errors
        });
    }

    next();
}

export default validateExpress;