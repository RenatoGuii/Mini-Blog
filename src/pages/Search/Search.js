import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";
import { Link } from "react-router-dom";
import PostDetail from "../../components/PostDetail";
import styles from "./Search.module.css";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const { documents: posts, loading } = useFetchDocuments("posts", search);

  return (
    <div className={styles.search}>
      {loading && (
        <p style={{ textAlign: "center", marginTop: "10px" }}>Carregando...</p>
      )}

      <h1>
        Resultados de: <span style={{ fontWeight: "400" }}>{search}</span>
      </h1>
      <div>
        {posts && posts.length === 0 && (
          <div className={styles.noResults}>
            <p style={{ textAlign: "center" }}>
              Não foram encontrados posts :(
            </p>
          </div>
        )}

        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}

        <Link to="/" className={styles.button}>
          Voltar
        </Link>
        
      </div>
    </div>
  );
};

export default Search;
