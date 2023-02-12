import styles from "./Navbar.module.css";

import { NavLink } from "react-router-dom";

import { useAuthentication } from "../hooks/useAuthentication";

import { useAuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useAuthentication();

  return (
    <nav>
      <NavLink className={styles.title} to="/">
        Mini <span>Blog</span>
      </NavLink>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          {!user ? (
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Entrar
            </NavLink>
          ) : (
            <NavLink
              to="/posts/criar"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Criar
            </NavLink>
          )}
        </li>
        <li>
          {!user ? (
            <NavLink
              to="/cadastro"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Cadastrar
            </NavLink>
          ) : (
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Dashboard
            </NavLink>
          )}
        </li>
        <li>
          <NavLink
            to="/sobre"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Sobre
          </NavLink>
        </li>
        {user && (
          <li>
            <NavLink onClick={logout}>Sair</NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
