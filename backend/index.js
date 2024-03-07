const express = require("express");
const app = express();
const cors = require("cors");
const { getPost, addPost, updatePost, deletePost } = require("./consultas.js");

app.use(express.json());
app.use(cors());

app.listen(3000, () => {
  console.log("Server ON!");
});

app.get("/posts", async (req, res) => {
  try {
    const post = await getPost();
    res.send(post);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los posts." });
  }
});

app.post("/posts", async (req, res) => {
  try {
    const { titulo, url, descripcion, likes } = req.body;
    await addPost(titulo, url, descripcion, likes);
    res.status(201).json({
      message: "Post agregado correctamente.",
      post: { titulo, url, descripcion, likes },
    });
  } catch (error) {
    res.status(500).json({ error: "Error al agregar el post." });
  }
});

app.put("/posts/like/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await updatePost(id);
    res.status(200).json({
      message: "¡El post se modificó correctamente!",
    });
  } catch (error) {
    console.error("Error al modificar el post:", error);
    res.status(500).json({ error: "Error al modificar el post." });
  }
});

app.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deletePost(id);
    res.status(200).json({
      message: "Post eliminado correctamente.",
    });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el post." });
  }
});
