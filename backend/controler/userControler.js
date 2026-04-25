import user from "../models/userModel.js";

export const getUsers = async (req, res) => {
    try {
        const response = await user.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
};