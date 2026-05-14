import user from "../models/userModel.js";

export const getUsers = async (req, res) => {
    try {
        const response = await user.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.error('getUsers error:', error.message);
        res.status(500).json({ msg: error.message });
    }
};

export const getUsersById = async (req, res) => {
    try {
        const response = await user.findOne({ where: { id: req.params.id } });
        if (!response) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(200).json(response);
    } catch (error) {
        console.error('getUsersById error:', error.message);
        res.status(500).json({ msg: error.message });
    }
};

export const createUser = async (req, res) => {
    try {
        // Validasi input
        if (!req.body.name || !req.body.email || !req.body.gender) {
            return res.status(400).json({ msg: 'Name, email, and gender are required' });
        }
        const response = await user.create(req.body);
        res.status(201).json({ msg: "User Created", data: response });
    } catch (error) {
        console.error('createUser error:', error.message);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ msg: 'Email already exists' });
        }
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ msg: error.errors[0].message });
        }
        res.status(500).json({ msg: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const [updated] = await user.update(req.body, { 
            where: { id: req.params.id } 
        });
        
        if (updated === 0) {
            return res.status(404).json({ msg: 'User not found' });
        }
        
        res.status(200).json({ msg: "User Updated" });
    } catch (error) {
        console.error('updateUser error:', error.message);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ msg: 'Email already exists' });
        }
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ msg: error.errors[0].message });
        }
        res.status(500).json({ msg: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const deleted = await user.destroy({ 
            where: { id: req.params.id } 
        });
        
        if (deleted === 0) {
            return res.status(404).json({ msg: 'User not found' });
        }
        
        res.status(200).json({ msg: "User Deleted" });
    } catch (error) {
        console.error('deleteUser error:', error.message);
        res.status(500).json({ msg: error.message });
    }
};