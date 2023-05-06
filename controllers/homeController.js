import User from "../models/user.js";

export const homePage = async(req, res) => {
    const users = await User.findAll({ where: { 'contact_status': 0 } });

    res.render('home/home', { users });
}