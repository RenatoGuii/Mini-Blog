import styles from "./Register.module.css";

import { useEffect, useState } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { createUser, error: authError, loading } = useAuthentication();

  const changeSubmit = async (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
    };

    if (password !== confirmPassword) {
      setError("As senhas precisam ser iguais!");
      return;
    }

    const res = await createUser(user);

    console.log(res);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={styles.cadastro}>
      <h1>Cadastre-se para postar</h1>
      <p className={styles.p1}>Crie seu usuário e compartilhe suas histórias</p>
      <form onSubmit={changeSubmit}>
        <label className={styles.forms}>
          <p>Nome:</p>
          <input
            type="text"
            placeholder="Nome do usuário"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </label>
        <label className={styles.forms}>
          <p>E-mail:</p>
          <input
            type="email"
            placeholder="E-mail de usuário"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </label>
        <label className={styles.forms}>
          <p>Senha:</p>
          <input
            type="password"
            placeholder="Insira a senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </label>
        <label className={styles.forms}>
          <p>Confirmação de senha:</p>
          <input
            type="password"
            placeholder="Confirme a senha"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            required
          />
        </label>
        {!loading && (
          <input type="submit" value="Entrar" className={styles.submit} />
        )}
        {loading && <span className="loading">Aguarde...</span>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Register;
