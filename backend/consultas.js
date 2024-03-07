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

const checkPostExistence = (rowCount, errorCode, errorMessage) => {
  if (rowCount === 0) {
    throw { code: errorCode, message: errorMessage };
  }
};

const getPost = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM posts ORDER BY id");
    console.log(rows);
    return rows;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    throw error;
  }
};

const addPost = async (titulo, img, descrip, likes) => {
  try {
    if (!titulo.trim() || !img.trim() || !descrip.trim()) {
      throw { code: 400, message: "Los datos del post son inválidos" };
    }
    const consulta = "INSERT INTO posts VALUES (DEFAULT, $1, $2, $3, $4)";
    const { rowCount } = await pool.query(consulta, [
      titulo,
      img,
      descrip,
      likes,
    ]);
    checkPostExistence(rowCount, 500, "Error al agregar el post");
    return "Post agregado exitosamente";
  } catch (error) {
    console.error("Error al agregar datos:", error);
    throw error;
  }
};

const changePost = async (id) => {
  try {
    const consulta = "UPDATE posts SET likes = likes + 1 WHERE id = $1";
    const { rowCount } = await pool.query(consulta, [id]);
    checkPostExistence(rowCount, 404, "No se encontró ningún post con este ID");
  } catch (error) {
    console.error("Error al cambiar los datos:", error);
    throw error;
  }
};

const deletePost = async (id) => {
  try {
    const consulta = "DELETE FROM posts WHERE id = $1";
    const { rowCount } = await pool.query(consulta, [id]);
    checkPostExistence(rowCount, 404, "No se encontró ningún post con este ID");
  } catch (error) {
    console.error("Error al eliminar datos:", error);
    throw error;
  }
};

module.exports = { getPost, addPost, changePost, deletePost };
