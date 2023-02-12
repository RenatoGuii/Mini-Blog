import styles from "./Dashboard.module.css";
import { useAuthContext } from "../../contexts/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuthContext();
  const { documents: posts } = useFetchDocuments("posts");

  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      <p>Gerencie os seus posts</p>

      <div className={styles.container}>
        <div className={styles.titles}>
          <span>Título</span>
          <span>Ações</span>
        </div>

        <div className={styles.posts}>
          {posts &&
            posts.map((post) => {
              if (post.uid === user.uid) {
                return (
                  <div className={styles.post}>
                    <span>{post.title}</span>
                    <div>
                      <Link to={`/posts/${post.id}`} className={styles.buttons}>Ler</Link>
                      <Link className={styles.buttons}>Editar</Link>
                      <button className={styles.buttons}>Excluir</button>
                    </div>
                  </div>
                );
              }
            })}

          <Link to="/posts/criar" className={styles.createButton}>
            Criar novo post
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
