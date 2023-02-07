// CSS
import styles from "./Home.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

const Home = () => {
  const [query, setQuery] = useState()
  const [posts, setPosts] = useState([])

  const { user } = useAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <div className={styles.home}>
      <h1>Veja os nossos posts mais recentes</h1>

      <form className={styles.searchBar} onSubmit={handleSubmit} >
        <input type="text" placeholder="Ou busque por tags..." onChange={(e) => setQuery(e.target.value)} />

        <button>Pesquisar</button>
      </form>

      <div className={styles.post}>
        {posts && posts.length === 0 && (
          <div className={styles.noResults}>
            <p>Não foram encontrados posts :(</p>
            <Link to={user ? "/posts/criar" : "/login"} className={styles.link}>Criar primeiro post</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
