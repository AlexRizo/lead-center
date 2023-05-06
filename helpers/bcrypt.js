import bcryptjs from 'bcryptjs';

export const encrypt = (string) => {
    const salt = bcryptjs.genSaltSync();
    const hash = bcryptjs.hashSync(string, salt);

    return hash;
}

export const validatePassword = (string, strEnc) => {
    const resp = bcryptjs.compareSync(string, strEnc);

    return resp
}