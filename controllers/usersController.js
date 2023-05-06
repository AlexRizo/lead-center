import formatDate from "../helpers/formDate.js";
import User from "../models/user.js";

export const getUsers = async(req, res) => {
    const leads = await User.findAll({ where: { contact_status: 0 } });
    
    res.json(leads);
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
    const { user } = req.body;

    // const response = await User.create(user);
    console.log(user);
    
    res.json({ 
        message: 'Usuario creado correctamente.', 
        user
    });
}

export const updateUser = async(req, res) => {
    const { email, ...user } = req.body;
    const { id } = req.params;

    const $userDB = await User.findByPk(id);

    if (!$userDB) {
        return res.status(401).json({ 
            error: 'El usuario no existe.' 
        });
    }

    if (email) {
        let emailExist = await User.findOne({ where: { 'email': email } });

        if(emailExist && emailExist.id != id) {
            return res.status(401).json({error: 'El correo ya existe.'});
        } else if (emailExist && emailExist.id === id) {
            console.log('Hola mundo');
        }else {
            user.email = email;
        }
    }
    
    await User.update(user, { where: { 'id': id } });
    
    res.json({ 
        message: 'Usuario actualizado correctamente.',
    });
}

export const deleteUser = async(req, res) => {
    const { id } = req.params;

    if (req.user.roleId != 3) {
        return res.status(403).json({ error: 'Faltan permisos.' });
    }

    await User.destroy(id)

    res.status(200).json({ message: `El usuario ${ id } fue eliminado.` });
} 