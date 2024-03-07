const { Pool } = require("pg");
require("dotenv").config({ path: "./serv.env" });

// const pool = new Pool({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   allowExitOnIdle: true,
// });

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "welys182",
  database: "likeme",
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

const changeData = async (propiedad, id) => {
  try {
    const consulta = "UPDATE posts SET likes = $1 WHERE id = $2";
    const values = [propiedad, id];
    const { rowCount } = await pool.query(consulta, values);
    if (rowCount === 0) {
      throw { code: 404, message: "No se consiguió ningún post con este id" };
    }
  } catch (error) {
    console.error("Error al agregar datos:", error);
    throw error;
  }
};

const deleteData = async (id) => {
  try {
    const consulta = "DELETE FROM posts WHERE id = $1";
    const values = [id];
    const { rowCount } = await pool.query(consulta, values);
    if (rowCount === 0) {
      throw {
        code: 404,
        message: "No se consiguió ningún post con este id",
        rowCount,
      };
    }
  } catch (error) {
    console.error("Error al agregar datos:", error);
    throw error;
  }
};

module.exports = { getData, addData, changeData, deleteData };
