import formatDate from "../helpers/formDate.js";
import Staff from "../models/staff.js";
import User from "../models/user.js";

export const getUsers = async(req, res) => {
    const ur = req.header('ur')
    const uid = req.header('uid')

    let leads;

    if (ur == 1) {
        leads = await User.findAll({ where: { contact_status: [0, 1], staffId: uid }, include: { all: true } });
    } else {
        leads = await User.findAll({ where: { contact_status: 0 }, include: { all: true } });
    }
    
    res.json({ leads });
}

export const getMyUsers = async(req, res) => {
    const { id } = req.user;
    const status = req.header('status');

    let leads;

    switch (status) {
        case "0":
            leads = await User.findAll({ where: { staffId: id, contact_status: 0 } });
            break;
        case "1":
            leads = await User.findAll({ where: { staffId: id, contact_status: 1 } });            
            break;
        case "2":
            leads = await User.findAll({ where: { staffId: id, contact_status: 2 } });            
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
            userInfo.plaformId = 3
            break;
        case 'ig':
            userInfo.plaformId = 4
            break;
        default:
            userInfo.plaformId = 7
            break;
    }

    userInfo.date_contact = formatDate(date_contact);
    await User.create(userInfo);
    return res.json({ response: 'Prospecto agregado correctamente.', userInfo });
}

export const createUser = async(req, res) => {
    const user = req.body;
    const staff = req.user;    

    if (staff.roleId === 1) {
        return res.status(200).json({ error: "Sin permisos", message: 'El prospecto no se ha podido crear.' });
    }

    const response = await User.create(user);
    
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
        let emailExist = await User.findOne({ where: { 'email': email } });
        console.log(emailExist.id, id);
        if(emailExist && emailExist.id != id) {
            return res.status(401).json({error: 'El correo ya existe.'});
        } else if (emailExist && emailExist.id === id) {
            console.log('Acción permitida.');
        } else {
            user.email = email;
        }
    }

    if (!staffId) {
        user.staffId = null;
    } else {
        user.staffId = staffId;
    }

    console.table(user);
    
    await User.update(user, { where: { 'id': id } });
    
    
    
    res.json({ 
        message: 'Usuario actualizado correctamente.',
    });
}

export const updateContactStatusUser = async(req, res) => {
    const { id, contact_status } = req.body;

    let message = '';

    await User.update({ contact_status }, { where: { id } })

    if (contact_status === 1) {
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