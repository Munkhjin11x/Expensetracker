import express from "express";
import {
    createUser,
    deleteUser,
    getOneUser,
    getUsers,
    updateUser,
} from "../Controller/user.js"
const user = express.Router()
user.route('/').get(getUsers).post(createUser);
user.route('/user').get(getOneUser).delete(deleteUser).put(updateUser)
export { user }