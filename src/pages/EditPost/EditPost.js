import styles from "./EditPost.module.css";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useEditDocument } from "../../hooks/useEditDocument"

const EditPost = () => {
  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id);

  const [title, setTitle] = useState("");
  const [urlImage, setUrlImage] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setUrlImage(post.urlImage);

      const textTags = post.tagsArray.join(", ");

      setTags(textTags);
    }
  }, [post]);

  const { user } = useAuthContext();

  const navigate = useNavigate();

  const { editDocument, response } = useEditDocument("posts");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // validate image URL
    try {
      new URL(urlImage);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL!");
      return;
    }

    // criar array de tags
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    // checar todos os valores
    if (!title || !urlImage || !content || !tags) {
      setFormError("Todos os campos precisam ser preenchidos!");
    }

    if (formError) return;

    const data = {
      title,
      urlImage,
      content,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    }

    editDocument(id, data)
    
    // redirect to home page
    navigate("/dashboard");
  };

  return (
    <div>
      {post && (
        <div className={styles.EditPost}>
          <h2>
            Editando post:{" "}
            <span style={{ fontWeight: "400" }}>{post.title}</span>
          </h2>

          <p className={styles.p1}> Edite seu post da maneira que desejar! </p>

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

            <p className={styles.previewTitle}>Preview da imagem atual:</p>
            <img
              className={styles.previewImage}
              src={post.urlImage}
              alt={post.title}
            />

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
              <input type="submit" value="Editar" className={styles.submit} />
            )}
            {response.loading && (
              <input type="submit" value="Aguarde..." className="loading" />
            )}
            {(response.error || formError) && (
              <p className="error">{response.error || formError}</p>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default EditPost;
