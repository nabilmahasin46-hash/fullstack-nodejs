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
export const updateUser = async (req, res) => {
    try {
        const response = await user.update(req.body, { where: { id: req.params.id } });
        res.status(200).json({ msg: "User Updated" });
    } catch (error) {
        console.log(error.message);
    }
};
export const deleteUser = async (req, res) => {
    try {
        const response = await user.destroy({ where: { id: req.params.id } });
        res.status(200).json({ msg: "User Deleted  " });
    } catch (error) {
        console.log(error.message);
    }
};