import styles from "./PostDetail.module.css"

import { Link } from "react-router-dom"

const postDetail = ({ post }) => {

  return (
    <div className={styles.detail}>
        <img src={post.urlImage} />
        <h3>{post.title}</h3>
        <p className={styles.author}>por: {post.createdBy}</p>
        <p className={styles.tags}>
            {post.tagsArray.map((tag) => (
                <span key={tag}><b>#</b><span className={styles.tag}>{tag}</span> </span>
            ))}
        </p>
        
        <Link to={`/posts/${post.id}`} className={styles.button} >Ler</Link>
    </div>
  )
}

export default postDetail