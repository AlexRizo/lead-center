import { Socket } from "socket.io";
import { validateJWT } from "../jwt/jwt.js";
import User from "../models/user.js";
import Message from "../models/message.js";

// * Leads
const updateLead = async(id, lead = {}) => {
    if (lead) {
        return await User.update(lead, { where: { id } });
    } else {
        return true;
    }
}

// * Messages
const createMessage = async(message = {}) => {
    await Message.create(message);
}

const getMessages = async() => {
    return await Message.findAll();
}

const deleteMessage = async(id) => {
    await Message.destroy({ where: { id } });
}

const socketController = async(socket = new Socket(), io) => {
    const user = await validateJWT(socket.handshake.headers['tkn']);

    if (!user) {
        return socket.disconnect();
    }

    // ? Seller note | Prospect page;
    socket.on('save-seller-note', ({ id }, lead = {}) => {
        updateLead(id, lead);
        return socket.emit('seller-note-saved', { id });
    });

    socket.on('get-admin-notes', async() => {
        io.emit('send-admin-notes', { messages: await getMessages() });
    });
    
    // ? Enviar nuevo mensaje (errores, actualizaciones, cambios, etc.); 
    socket.on('new-alert', async(message) => {
        await createMessage(message);
        return io.emit('send-admin-notes', { messages: await getMessages() });
    });

    socket.on('delete-note', async(id) => {
        await deleteMessage(id);
        return io.emit('send-admin-notes', { messages: await getMessages() });
    })
}

export default socketController;