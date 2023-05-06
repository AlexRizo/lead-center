import Role from '../models/role.js';
import User from '../models/user.js';

// ? Ésta validación es para la ruta de creación de usuario;
export const emailValidation = async(email = '') => {
    const $emailDB = await User.findOne({ where: { 'email': email } });

    if ($emailDB) {
        throw new Error('El correo ya se encuentra registrado.')
    }
}

export const roleValidation = async(role = 0) => {
    if (!role) {
        role = 1;
    }

    const $roleDB = await Role.findByPk(role);

    if (!$roleDB) {
        throw new Error(`El rol no es válido.`);
    }
}
// ?

// * Ésta validación es para la ruta de atualización de usuario;
export const updateEmailValidation = async(email = '') => {
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (email && !regex.test(email)) {
        throw new Error('El correo no es válido.');
    }
}
export const updateRoleValidation = async(role = 0) => {
    if (!role) {
        return true;
    }

    const $roleDB = await Role.findByPk(role);

    if (!$roleDB) {
        throw new Error(`El rol no es válido.`);
    }
}
//*