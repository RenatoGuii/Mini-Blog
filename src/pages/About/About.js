import styles from "./About.module.css"

import { Link } from "react-router-dom"

const About = () => {
  return (
    <div className={styles.about}>
      <h1>Sobre o Mini Blog</h1>
      <p>Este projeto consiste em um blog feito com <b>React</b> no front-end e <b>Firebase</b> no back-end</p>
      <Link to="/posts/criar" className={styles.link}>Criar post</Link>
    </div>
  )
}

export default About