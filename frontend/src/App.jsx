import axios from "axios";
import { useEffect, useState } from "react";
import Form from "./components/Form";
import Post from "./components/Post";
import { successToast, errorToast } from "./utils/toast.js";

const urlBaseServer = "http://localhost:3000";

function App() {
  const [titulo, setTitulo] = useState("");
  const [imgSrc, setImgSRC] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const { data: posts } = await axios.get(urlBaseServer + "/posts");
      setPosts(posts);
    } catch (error) {
      console.error("Error al obtener los posts:", error);
      errorToast("Error al obtener los posts:");
    }
  };

  const agregarPost = async () => {
    try {
      const post = { titulo, url: imgSrc, descripcion, likes: 0 };
      await axios.post(urlBaseServer + "/posts", post);
      successToast("Post agregado correctamente");
      await getPosts();
    } catch (error) {
      console.error("Error al agregar el post:", error);
      errorToast("Error al agregar el post");
    }
  };

  //Apliquemos las peticiones PUT-- DELETE-- con fetch--

  // const like = async (id) => {
  //   const ver = await axios.put(urlBaseServer + `/posts/like/${id}`);
  //   console.log(ver.data);
  //   await getPosts();
  // };

  const like = async (id) => {
    const res = await fetch(`${urlBaseServer}/posts/like/${id}`, {
      method: "PUT",
    });
    console.log(res);
    await getPosts();
  };

  // const eliminarPost = async (id) => {
  //   await axios.delete(urlBaseServer + `/posts/${id}`);
  //   getPosts();
  // };

  const eliminarPost = async (id) => {
    await fetch(`${urlBaseServer}/posts/${id}`, {
      method: "DELETE",
    });
    getPosts();
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="App">
      <h2 className="py-5 text-center">&#128248; Like Me &#128248;</h2>
      <div className="row m-auto px-5">
        <div className="col-12 col-sm-4">
          <Form
            setTitulo={setTitulo}
            setImgSRC={setImgSRC}
            setDescripcion={setDescripcion}
            agregarPost={agregarPost}
          />
        </div>
        <div className="col-12 col-sm-8 px-5 row posts align-items-start">
          {posts.map((post, i) => (
            <Post key={i} post={post} like={like} eliminarPost={eliminarPost} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
