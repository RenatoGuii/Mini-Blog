import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";
import { useAuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import PostDetail from "../../components/PostDetail";
import styles from "./Search.module.css";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const { user } = useAuthContext();

  const { documents: posts } = useFetchDocuments("posts", search);

  return (
    <div className={styles.search}>
      <h1>Resultados de: <span style={{fontWeight: "400"}}>{search}</span></h1>
      <div>
        {posts && posts.length === 0 && (
          <div className={styles.noResults}>
            <p style={{textAlign: "center"}} >Não foram encontrados posts :(</p>
            <Link to="/" className={styles.link}>
              Voltar
            </Link>
          </div>
        )}

        {posts &&
          posts.map((post) => <PostDetail key={post.id} post={post} />)}
      </div>
    </div>
  );
};

export default Search;
