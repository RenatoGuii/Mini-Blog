import styles from "./SinglePost.module.css";
import { useParams, Link } from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFetchDocument";

const SinglePost = () => {
  const { id } = useParams();
  const { document: post, loading } = useFetchDocument("posts", id);

  console.log(post);

  return (
    <div className={styles.post}>
      {loading && (
        <p style={{ textAlign: "center", marginTop: "10px" }}>Carregando...</p>
      )}
      {post && (
        <>
          <h2>{post.title}</h2>
          <p className={styles.author}>por: {post.createdBy}</p>
          <img src={post.urlImage} alt={post.title} />
          <p className={styles.content} sty>
            {post.content}
          </p>
          <h3>Este post trata sobre:</h3>
          <p className={styles.tags}>
            {post.tagsArray.map((tag) => (
              <span key={tag}>
                <b>#</b>
                <span className={styles.tag}>{tag}&nbsp;&nbsp;&nbsp;</span>{" "}
              </span>
            ))}
          </p>
          <Link className={styles.button} to="/">
            Voltar
          </Link>
        </>
      )}
    </div>
  );
};

export default SinglePost;
