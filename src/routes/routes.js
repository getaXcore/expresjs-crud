import express from "express";

import {
    getAllUsers,
    getUser,
    saveUser,
    updateUser,
    deleteUser,
} from "../controllers/controller.js";

const router = express.Router();

router.post('/vi/api/users/', getAllUsers);
router.post('/vi/api/users/user', getUser);
router.post('/vi/api/users/save', saveUser);
router.post('/vi/api/users/update', updateUser);
router.post('/vi/api/users/delete', deleteUser);

export default router;