import styles from "./NewPost.module.css";

import { useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useNavigate } from "react-router";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [urlImage, setUrlImage] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const { user } = useAuthContext();

  const navigate = useNavigate();

  const { insertDocument, response } = useInsertDocument("posts");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // validate image URL
    try {
      new URL(urlImage);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL!");
    }

    // criar array de tags
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    // checar todos os valores
    if (!title || !urlImage || !content || !tags) {
      setFormError("Todos os campos precisam ser preenchidos!");
    }

    if (formError) return;


    insertDocument({
      title,
      urlImage,
      content,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    // redirect to home page
    navigate("/");
  };

  return (
    <div className={styles.newPost}>
      <h1>Criar Post</h1>

      <p className={styles.p1}>
        {" "}
        Escreva sobre o que quiser e compartilhe o seu conhecimento!{" "}
      </p>

      <form onSubmit={handleSubmit}>
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
          <p>URL da imagem:</p>
          <input
            type="text"
            placeholder="Insira uma imagem que representa seu post"
            required
            onChange={(e) => setUrlImage(e.target.value)}
            value={urlImage}
          />
        </label>
        <label className={styles.forms}>
          <p>Conteúdo:</p>
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
        {!response.loading && (
          <input type="submit" value="Criar Post" className={styles.submit} />
        )}
        {response.loading && <span className="loading">Aguarde...</span>}
        {(response.error || formError) && (
          <p className="error">{response.error || formError}</p>
        )}
      </form>
    </div>
  );
};

export default NewPost;
