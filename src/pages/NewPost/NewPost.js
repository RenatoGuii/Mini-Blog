import styles from "./NewPost.module.css";
import { useState } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useAuthValue } from "../contexts/AuthContext"

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [urlImage, setUrlImage] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const { user } = useAuthValue()


  const changeSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.newPost}>
      <h1>Criar Post</h1>

      <p className={styles.p1}>
        {" "}
        Escreva sobre o que quiser e compartilhe o seu conhecimento!{" "}
      </p>

      <form onSubmit={changeSubmit}>
        <label className={styles.forms}>
          <p>Título:</p>
          <input
            type="text"
            placeholder="Pense em um bom título"
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <label className={styles.forms}>
          <p>Insira uma imagem que representa seu post:</p>
          <input
            type="text"
            placeholder="Insira uma imagem que representa seu post"
            required
            onChange={(e) => setUrlImage(e.target.value)}
            value={urlImage}
          />
        </label>
        <label className={styles.forms}>
          <p>Insira o conteúdo do post:</p>
          <textarea
            cols="30"
            rows="3"
            placeholder="Insira o conteúdo do post"
            required
            onChange={(e) => setContent(e.target.value)}
            value={content}
          ></textarea>
        </label>
        <label className={styles.forms}>
          <p>Tags:</p>
          <input
            type="text"
            placeholder="Insira as tags separadas por vírgula"
            required
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>
        {!loading && (
          <input type="submit" value="Entrar" className={styles.submit} />
        )}
        {loading && <span className="loading">Aguarde...</span>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default NewPost;
