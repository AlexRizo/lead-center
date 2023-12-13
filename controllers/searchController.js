import { Op } from "sequelize";
import Staff from "../models/staff.js";
import User from "../models/user.js";
import LeadStatus from "../models/leadStatus.js";

export const searchPage = async(req, res) => {
    const staffs = await Staff.findAll();
    
    return res.render('home/search', { staffs });
}

export const searchBy = async(req, res) => {
    const { keyword, target } = req.query;

    const results = await User.findAndCountAll({
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
            [target == 0 ? 'name' : target == 1 ? 'phone_number' : target == 2 ? 'date_contact' : 'staffId']: {
                [Op.like]: '%' + keyword + '%'
            }
        }
    });

    if (results.count == 0) return res.status(404).json({ message: 'No se han encontrado resultados', results: null});

    return res.status(200).json({ message: `Se han encontrado un total de ${ results.count } resultados`, results: results.rows });
}