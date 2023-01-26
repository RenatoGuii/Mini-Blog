import styles from "./Register.module.css";

const Register = () => {
  return (
    <div className={styles.cadastro}>
      <h1>Cadastre-se para postar</h1>
      <p className={styles.p1}>Crie seu usuário e compartilhe suas histórias</p>
      <form>
        <div className={styles.forms}>
          <p>Nome:</p>
          <input type="text" name="" id="" placeholder="Nome do usuário" />
        </div>
        <div className={styles.forms}>
          <p>E-mail:</p>
          <input type="email" name="" id="" placeholder="E-mail de usuário" />
        </div>
        <div className={styles.forms}>
          <p>Senha:</p>
          <input type="password" name="" id="" placeholder="Insira a senha" />
        </div>
        <div className={styles.forms}>
          <p>Confirmação de senha:</p>
          <input type="password" name="" id="" placeholder="Confirme a senha" />
        </div>
        <input type="submit" value="Entrar" className={styles.submit} />
      </form>
    </div>
  );
};

export default Register;
