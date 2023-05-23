import SellerNote from "../models/sellerNote.js";

export const getLeadNotes = async(req, res) => {
    const notes = await SellerNote.findAll({ where: { userId: req.header('leadId') }, order: [['id', 'DESC']]});
    
    return res.status(200).json({ notes });
}

export const createSellerNote = async(req, res) => {
    const note = req.body;

    note.staffId = req.user.id;

    if (!note.name) {
        return res.status(400).json({ error: 'La nota no puede ir vacía.' });
    }

    await SellerNote.create(note);

    return res.status(200).json({ message: 'Se ha creado la nota' });
}