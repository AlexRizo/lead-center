import { validateJWT } from "../jwt/jwt.js";

export const role = async(req, res, next) => {
    const { tkn } = req.query;

    const user = await validateJWT(tkn);
    
    if (!user || user.roleId === 1 || !user.roleId) {
        return res.status(403).redirect(`/403`);
    }

    req.staffRole = user.roleId;
    
    return next();
}