import formatDate from "../helpers/formDate.js";
import User from "../models/user.js";
import Platform from "../models/platform.js";

export const getUsers = async(req, res) => {
    const ur = req.header('ur')
    const uid = req.header('uid')

    let leads;

    if (ur == 1) {
        leads = await User.findAll({ where: { LeadStatusId: [1, 2], staffId: uid }, include: { all: true }, order: [['date_contact', 'DESC']] });
    } else {
        leads = await User.findAll({ where: { LeadStatusId: 1 }, include: { all: true }, order: [['date_contact', 'DESC']] });
    }
    
    res.json({ leads });
}

export const getMyUsers = async(req, res) => {
    const { id } = req.user;
    const status = req.header('status');

    let leads;

    switch (status) {
        case "0":
            leads = await User.findAll({ where: { staffId: id, LeadStatusId: 1 }, include: { model: Platform } });
            break;
        case "1":
            leads = await User.findAll({ where: { staffId: id, LeadStatusId: 2 }, include: { model: Platform } });            
            break;
        case "2":
            leads = await User.findAll({ where: { staffId: id, LeadStatusId: 3 }, include: { model: Platform } });            
            break;
    }
    
    return res.status(200).json({ leads });
}

export const createUserByZapier = async(req, res) => {
    const { platformId, date_contact, ...userInfo } = req.body;
    const zapierPass = req.header('zapierPass');

    if(zapierPass != process.env.ZAPIERKEY) {
        return res.status(400).json({ response: 'invalid ZAPIERPASS' });
    }

    switch (platformId) {
        case 'fb':
            userInfo.platformId = 3
            break;
        case 'ig':
            userInfo.platformId = 4
            break;
        default:
            userInfo.platformId = 7
            break;
    }

    userInfo.date_contact = formatDate(date_contact);

    await User.create(userInfo);

    return res.json({ response: 'Prospecto agregado correctamente.', userInfo });
}

export const createUser = async(req, res) => {
    const user = req.body;
    const staff = req.user;    

    await User.create(user);
    
    return res.json({ message: 'Usuario creado correctamente.' });
}

export const updateUser = async(req, res) => {
    const { email, staffId, ...user } = req.body;
    const { id } = req.params;
    const staff = req.user;

    if (staff.roleId === 1) {
        return res.status(401).json({ error:'Sin permisos', message: 'No tienes permisos.' });
    }

    const $userDB = await User.findByPk(id);

    if (!$userDB) {
        return res.status(401).json({ 
            error: 'El usuario no existe.' 
        });
    }

    if (email) {
        user.email = email;
    }

    if (staffId == 0) {
        user.staffId = null;
    } else {
        user.staffId = staffId;
    }
    
    await User.update(user, { where: { 'id': id } });
    
    res.json({ 
        message: 'Usuario actualizado correctamente.',
    });
}

export const updateContactStatusUser = async(req, res) => {
    const { id, LeadStatusId } = req.body;
    

    let message = '';

    await User.update({ LeadStatusId }, { where: { id } })

    if (LeadStatusId === 2) {
        message = 'Se ha marcado como "En Seguimiento".'
    } else {
        message = 'Se ha marcado como "Contactado"'
    }

    return res.status(200).json({ message });
}

export const deleteUser = async(req, res) => {
    const { id } = req.params;

    if (req.user.roleId != 3) {
        return res.status(403).json({ error: 'Faltan permisos.' });
    }

    await User.destroy(id)

    res.status(200).json({ message: `El usuario ${ id } fue eliminado.` });
} 