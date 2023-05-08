import { validationResult } from "express-validator"

const validateExpress = (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        console.log(error);
        return res.status(400).json({
            error
        });
    }

    next();
}

export default validateExpress;