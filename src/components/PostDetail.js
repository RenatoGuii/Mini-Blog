import styles from "./PostDetail.module.css"

import { Link, useParams } from "react-router-dom"

const PostDetail = ({ post }) => {
  
  const { id = post.id } = useParams()

  return (
    <div className={styles.detail}>
        <img src={post.urlImage} alt={post.title} />
        <h3>{post.title}</h3>
        <p className={styles.author}>por: {post.createdBy}</p>
        <p className={styles.tags}>
            {post.tagsArray.map((tag) => (
                <span key={tag}><b>#</b><span className={styles.tag}>{tag}&nbsp;&nbsp;</span> </span>
            ))}
        </p>
        
        <Link to={`/posts/${id}`} className={styles.button} >Ler</Link>
    </div>
  )
}

export default PostDetail