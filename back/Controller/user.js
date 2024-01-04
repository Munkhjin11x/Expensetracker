import { pool } from "../db.js";
const getUsers = async (req, res) => {
    try {
        const queryText = `SELECT * FROM users`;
        const response = await pool.query(queryText);
        res.send(response.rows);
    } catch (error) {
        console.error(error);
    }
};
const getOneUser = async (req, res) => {
    const { id, name, email } = req.body;
    try {
        const queryText = `
            SELECT * FROM users WHERE id='${id}' OR (name='${name}' AND id != '${id}') OR (email='${email}' AND id != '${id}')
        `;
        const response = await pool.query(queryText);
        res.send(response.rows);
    } catch (error) {
        console.error(error);
    }
};
const createUser = async (req, res) => {
    const { name, email ,password } = req.body;
    try {
        const queryText = "INSERT INTO users (name, email, password) VALUES ($1, $2 ,$3) RETURNING *";
        const result = await pool.query(queryText, [name, email ,password]);
        res.send(result.rows[0]);
    } catch (error) {
        console.error(error);
    }
};
const deleteUser = async (req, res) => {
    const { name, email, id } = req.body;
    try {
        const queryText = `DELETE FROM users WHERE (name = '${name}' AND email = '${email}') OR id = '${id}'`;
        await pool.query(queryText);
        res.send("OK");
    } catch (error) {
        console.error(error);
    }
};
const updateUser = async (req, res) => {
    const { name, email, id } = req.body;
    try {
        const queryText = `UPDATE users SET name = '${name}', email = '${email}' WHERE id = '${id}'`;
        await pool.query(queryText);
        res.send("Updated");
    } catch (error) {
        console.error(error);
    }
};

export { getUsers, getOneUser,  createUser, deleteUser, updateUser };
