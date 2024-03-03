const { Pool } = require("pg");
require("dotenv").config({ path: "./serv.env" });

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  allowExitOnIdle: true,
});

const getData = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM posts");
    console.log(rows);
    return rows;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    throw error;
  }
};

const addData = async (titulo, img, descrip, likes) => {
  try {
    const consulta = "INSERT INTO posts VALUES (DEFAULT, $1, $2, $3, $4)";
    await pool.query(consulta, [titulo, img, descrip, likes]);
    return "Post agregado exitosamente";
  } catch (error) {
    console.error("Error al agregar datos:", error);
    throw error;
  }
};

module.exports = { getData, addData };
