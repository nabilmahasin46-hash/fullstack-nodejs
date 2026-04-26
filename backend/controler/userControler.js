import user from "../models/userModel.js";

export const getUsers = async (req, res) => {
    try {
        const response = await user.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
};

export const getUsersById = async (req, res) => {
    try {
        const response = await user.findOne({ where: { id: req.params.id } });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
};

export const createUser = async (req, res) => {
    try {
        const response = await user.create(req.body);
        res.status(201).json({ msg: "User Created" });
    } catch (error) {
        console.log(error.message);
    }
};