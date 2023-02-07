import styles from "./Login.module.css";

import { useEffect, useState } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { error: authError, loading, login } = useAuthentication();

  const changeSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    const res = await login(user);

    console.log(res);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={styles.login}>
      <h1>Entrar</h1>
      <p className={styles.p1}>Faça o login para poder utilizar o sistema</p>
      <form onSubmit={changeSubmit}>
        <div className={styles.forms}>
          <p>E-mail:</p>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            value={email}
            placeholder="usuario@mail.com"
          />
        </div>
        <div className={styles.forms}>
          <p>Senha:</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
            value={password}
            placeholder="123456"
          />
        </div>
        {!loading && (
          <input type="submit" value="Entrar" className={styles.submit} />
        )}
        {loading && <input type="submit" value="Aguarde..." className="loading" />}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
