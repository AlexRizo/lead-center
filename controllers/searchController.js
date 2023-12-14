import { Op } from "sequelize";
import Staff from "../models/staff.js";
import User from "../models/user.js";
import LeadStatus from "../models/leadStatus.js";
import { validateJWT } from "../jwt/jwt.js";

export const searchPage = async(req, res) => {
    const staffs = await Staff.findAll();

    const user = await validateJWT(req.query.tkn);
    
    return res.render('home/search', { staffs, role: user.roleId });
}

export const searchBy = async(req, res) => {
    const { keyword, target,  } = req.query;

    const { user } = req;
    
    let results = {};

    if (!user) return res.status(403).redirect('/403');

    if (user.roleId != 1) {
        results = await User.findAndCountAll({
            attributes: ['id', 'name', 'phone_number', 'date_contact', 'LeadStatusId'],
            include: [
                {
                    model: Staff, // Aquí especificas el modelo de la relación que deseas incluir
                    attributes: ['name'] // Y aquí los campos de ese modelo que deseas seleccionar
                },
                {
                    model: LeadStatus,
                    attributes: ['name']
                }
            ],
            where: {
                [target == 0 ? 'name' : target == 1 ? 'phone_number' : target == 2 ? 'date_contact' : 'staffId']
                    : target == 3 ? { [Op.eq]: keyword } : { [Op.like]: `%${ keyword }%` }
            }
        });  
    } else {
        results = await User.findAndCountAll({
            attributes: ['id', 'name', 'phone_number', 'date_contact', 'LeadStatusId'],
            include: [
                {
                    model: Staff, // Aquí especificas el modelo de la relación que deseas incluir
                    attributes: ['name'] // Y aquí los campos de ese modelo que deseas seleccionar
                },
                {
                    model: LeadStatus,
                    attributes: ['name']
                }
            ],
            where: {
                ['staffId']: user.id,
                [target == 0 ? 'name' : target == 1 ? 'phone_number' : 'date_contact' ]
                    : { [Op.like]: `%${ keyword }%` }
            }
        });
    }

    if (results.count == 0) {
        return res.status(404).json({ message: 'No se han encontrado resultados', results: null })
    } else {
        return res.status(200).json({ message: `Se han encontrado un total de ${ results.count } resultados`, results: results.rows });
    }; 
}