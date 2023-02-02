import styles from "./About.module.css";

import { Link } from "react-router-dom";

import { useAuthContext } from "../../contexts/AuthContext";

const About = () => {
  const { user } = useAuthContext();

  return (
    <div className={styles.about}>
      <h1>Sobre o Mini Blog</h1>

      <p className={styles.text}>
        Este projeto consiste em um blog feito com <b>React</b> no front-end e{" "}
        <b>Firebase</b> no back-end
      </p>

      <Link to={user ? "/posts/criar" : "/login"} className={styles.link}>
        Criar post
      </Link>
    </div>
  );
};

export default About;
