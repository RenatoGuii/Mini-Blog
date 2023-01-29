import styles from "./Footer.module.css";

const Footer = () => {
  return (
      <footer>
        <div className={styles.text_footer} >
          <h3>Escreva sobre o que você tem interesse!</h3>
          <p>Mini Blog &copy; 2023</p>
        </div>
      </footer>
  );
};

export default Footer;
