import styles from "./Login.module.css"

const Login = () => {
  return (
    <div className={styles.login} >
        <h1>Entrar</h1>
        <p className={styles.p1} >Faça o login para poder utilizar o sistema</p>
        <form>
            <div className={styles.forms} >
                <p>E-mail:</p>
                <input type="email" name="" id="" placeholder="usuario@mail.com" />
            </div>
            <div className={styles.forms} >
                <p>Senha:</p>
                <input type="password" name="" id="" placeholder="123456" />
            </div>
            <input type="submit" value="Entrar" className={styles.submit} />
        </form>
    </div>
  )
}

export default Login