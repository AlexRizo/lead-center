import { Socket } from "socket.io";
import { validateJWT } from "../jwt/jwt.js";
import User from "../models/user.js";

const updateLead = async(id, lead = {}) => {
    if (lead) {
        return await User.update(lead, { where: { id } });
    } else {
        return true;
    }
}

const socketController = async(socket = new Socket(), io) => {
    const user = await validateJWT(socket.handshake.headers['tkn']);

    if (!user) {
        return socket.disconnect();
    }

    socket.on('save-saler-note', ({ id }, lead = {}) => {
        updateLead(id, lead);
        return socket.emit('saler-note-saved', { id });
    });
}

export default socketController;