import User from "../models/user.js";

export const homePage = async(req, res) => {
    const leads = await User.findAll({ where: { 'contact_status': 0 } });

    res.render('home/home', { leads });
}

export const leadPage = async(req, res) => {
    const { id } = req.params;

    const lead = await User.findByPk(id, { include: { all: true } });
    
    res.render('home/lead', { lead });
}