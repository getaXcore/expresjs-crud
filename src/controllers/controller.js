import User from "../models/user.js";
import Response from "../utils/res.js"

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        Response(users, 'Success', res);
    } catch (e) {
        Response(null, e.message, res);
    }
}

export const getUser = async (req, res) => {
    try {
        const data = req.body;

        const user = await User.findOne({
            where: { id: data.id }
        });

        if (user === null) {
            Response(user, 'User not found', res);
            return;
        }

        Response(user, 'Success', res);
    } catch (e) {
        Response(null, e.message, res);
    }
}

export const saveUser = async (req, res) => {
    try {
        await User.create(req.body);
        Response(null, 'Saving...', res);
    } catch (e) {
        Response(null, e.message, res);
    }
}

export const updateUser = async (req, res) => {
    try {
        const data = req.body;

        const user = await User.findOne({
            where: { id: data.id }
        });

        if (user === null) {
            Response(user, 'User not found', res);
            return;
        };

        await User.update(data, {
            where: { id: data.id }
        });

        Response(null, 'Updated...', res);

    } catch (e) {
        Response(null, e.message, res);
    }
}

export const deleteUser = async (req, res) => {
    try {
        const data = req.body;

        const user = await User.findOne({
            where: { id: data.id }
        });

        if (user === null) {
            Response(user, 'User not found', res);
            return;
        };

        await User.destroy({
            where: { id: data.id }
        });

        Response(null, 'Deleted...', res);

    } catch (e) {
        Response(null, e.message, res);
    }
}