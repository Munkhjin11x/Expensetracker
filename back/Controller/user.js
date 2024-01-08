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
    const { name, email, password , currency_type } = req.body;
    try {
      const emailExistsQuery = "SELECT * FROM users WHERE email = $1";
      const emailExistsResult = await pool.query(emailExistsQuery, [email]);
      if (emailExistsResult.rows.length > 0) {
        return res.status(409).json({ error: "Email already exists" });
      }
     const insertQuery =
        "INSERT INTO users (name, email, password ,currency_type) VALUES ($1, $2, $3, $4) RETURNING *";
      const result = await pool.query(insertQuery, [name, email, password ,currency_type]);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
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
  const { name, email, currency_type } = req.body;
  try {
    const queryText = 'UPDATE users SET name = $1, currency_type = $2 WHERE email = $3';
    const queryParams = [name, currency_type, email];

    await pool.query(queryText, queryParams);
    res.send("Updated");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};


const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log(req.body);
    const queryText = `SELECT * FROM users WHERE email = '${email}'`;
    const find = await pool.query(queryText);

    if (find.rows.length === 0) {
      return res.send("cannot found this user");
    }

    if (find.rows[0].password != password) {
      return res.send("username or password incorrect");
    }

    res.send("ok");
  } catch (error) {
    console.error(error);
  }
};

export { getUsers, getOneUser, createUser, deleteUser, updateUser, loginUser };
