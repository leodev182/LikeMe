const express = require("express");
const app = express();
const cors = require("cors");
const { getData, addData } = require("./consultas.js");

app.use(express.json());
app.use(cors());

app.listen(3000, () => {
  console.log("Server ON!");
});

app.get("/posts", async (req, res) => {
  try {
    const post = await getData();
    res.send(post);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los posts." });
  }
});

app.post("/posts", async (req, res) => {
  try {
    const { titulo, url, descripcion, likes } = req.body;
    await addData(titulo, url, descripcion, likes);
    res.status(201).json({
      message: "Post agregado correctamente.",
      post: { titulo, url, descripcion, likes },
    });
  } catch (error) {
    res.status(500).json({ error: "Error al agregar el post." });
  }
});
