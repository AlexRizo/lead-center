import { validateJWT } from "../jwt/jwt.js";
import LeadStatus from "../models/leadStatus.js";
import Origin from "../models/origin.js";
import Platform from "../models/platform.js";
import Role from "../models/role.js";
import Staff from "../models/staff.js";
import User from "../models/user.js";

export const homePage = async(req, res) => {
    const leads = await User.findAll({ where: { 'LeadStatusId': 1 }, order: [['staffId', 'ASC']] });

    return res.render('home/home', { leads });
}

export const leadPage = async(req, res) => {
    const { id } = req.params;
    const user = await validateJWT(req.query.tkn);

    const lead = await User.findByPk(id, { include: { all: true } });

    if (!lead) {
        return res.redirect('/404');
    }

    if (!user || user.roleId === 1 && user.id != lead.staffId ) {
        return res.redirect('/403');
    }
    
    return res.render('home/lead', { lead });
}

export const addLeadPage = async(req, res) => {
    const user = await validateJWT(req.query.tkn)

    if (!user) {
        return res.status(403).redirect('/403');
    }
    
    const staffs = await Staff.findAll({ where: { roleId: [1, 2], status: 1 } });
    const origins = await Origin.findAll();
    const platforms = await Platform.findAll();

    return res.render('home/addLead', { staffs, origins, platforms, user });
}

export const myLeadPage = async(req, res) => {
    return res.render('home/myLeads');
}

export const adminPage = async(req, res) => {
    const SR = (req.staffRole);
    let users = {};

    switch (SR) {
        case 2:
            users = await Staff.findAll({ include: [ Role ], where: { roleId: [1, 2] }, order: [['roleId', 'DESC']] });                        
            break;
        case 3:
            users = await Staff.findAll({ include: [ Role ], order: [['roleId', 'DESC']] });                        
            break;
    }

    const leads = await User.findAll({ where: { staffId: null }, include: [Origin, Platform] });
    
    return res.render('home/administration', { users, leads, sr: SR })
}

export const viewAdminPage = async(req, res) => {
    const { id } = req.params;
    const SR = req.staffRole;

    const user = await Staff.findByPk(id, { include: { model: Role } });

    if (user.roleId === 3 && SR != 3 ) {
        return res.status(403).redirect('/403');
    }
    
    const pendingLeads = await User.findAndCountAll({ where: { staffId: user.id, LeadStatusId: 1 } });
    const followLeads = await User.findAndCountAll({ where: { staffId: user.id, LeadStatusId: 2 } });
    const contactedLeads = await User.findAndCountAll({ where: { staffId: user.id, LeadStatusId: 3 } });
    
    const roles = await Role.findAll();
    
    res.render('home/seller', {
        pending: pendingLeads.count,
        follow: followLeads.count,
        contacted: contactedLeads.count,
        roles,
        user
    });
} 

export const ContactedAndFollowing = async(req, res) => {
    const following = await User.findAll({ 
        where: { LeadStatusId: 2 },
        include: [
            Staff,
            Origin,
            { 
                model: LeadStatus,
                attributes: ['name'] 
            }
        ]
     });
    const completed = await User.findAll({ 
        where: { LeadStatusId: 3 },
        include: [
            Staff,
            Origin,
            { 
                model: LeadStatus,
                attributes: ['name']
            }
        ]
    });
    
    return res.render('home/contacted', { following, completed });
}