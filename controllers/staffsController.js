import { encrypt } from "../helpers/bcrypt.js";
import Staff from "../models/staff.js";

export const createStaff = async(req, res) => {
    const { password, ...user } = req.body;

    user.password = encrypt(password);

    await Staff.create(user);

    return res.status(200).json({ message: 'Usuario creado correctamente', user })
}

export const updateStaff = async(req, res) => {
    const { name, email, password, roleId, status } = req.body;
    const { id } = req.params;

    if (req.user.roleId != 2 && req.user.roleId != 3 ) {
        return res.status(403).json({ error: 'Faltan permisos.' });
    }

    const user = {};

    const $userDB = await Staff.findByPk(id);

    if (!$userDB) {
        return res.status(401).json({ 
            error: 'El usuario no existe.' 
        });
    }

    if (name) {
        user.name = name;
    }

    if (email) {
        let emailExist = await Staff.findOne({ where: { 'email': email } });

        if(emailExist && emailExist.id != id) {
            return res.status(401).json({error: 'El correo ya existe.'});
        } else if (emailExist && emailExist.id === id) {
            console.log('Acción permitida.');
        } else {
            user.email = email;
        }
    }

    if (password) {
        user.password = encrypt(password);
    }

    if (roleId) {
        user.roleId = roleId;
    }

    if (status) {
        user.status = status;
    }
    
    await Staff.update(user, { where: { 'id': id } });
    
    res.json({ 
        message: 'Usuario actualizado correctamente.',
    });
}