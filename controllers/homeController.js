import Origin from "../models/origin.js";
import Platform from "../models/platform.js";
import Staff from "../models/staff.js";
import User from "../models/user.js";

export const homePage = async(req, res) => {
    const leads = await User.findAll({ where: { 'contact_status': 0 } });

    return res.render('home/home', { leads });
}

export const leadPage = async(req, res) => {
    const { id } = req.params;

    const lead = await User.findByPk(id, { include: { all: true } });
    
    return res.render('home/lead', { lead });
}

export const addLeadPage = async(req, res) => {
    const staffs = await Staff.findAll({ where: { roleId: [1, 2], status: 1 } });
    const origins = await Origin.findAll();
    const platforms = await Platform.findAll();

    return res.render('home/addLead', { staffs, origins, platforms });
}