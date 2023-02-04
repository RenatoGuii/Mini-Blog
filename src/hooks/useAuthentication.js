import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // cleanup
  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  const checkCancelled = () => {
    if (cancelled) {
      return;
    }
  };

  // REGISTER
  const createUser = async (data) => {
    checkCancelled();

    setLoading(true);
    setError(null);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, {
        displayName: data.name,
      });

      setLoading(false);

      return user;
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);

      let systemErrorMessage;

      if (error.message.includes("Password")) {
        systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "E-mail já cadastrado.";
      } else if (error.message.includes("invalid-email")) {
        systemErrorMessage = 'E-mail invalido, use o formato "nome@email.com"';
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde.";
      }

      setError(systemErrorMessage);
    }

    setLoading(false);
  };

  // LOGOUT
  const logout = () => {
    checkCancelled();

    signOut(auth);
  };

  // LOGIN
  const login = async (data) => {
    checkCancelled();

    setLoading(true);
    setError(false)

    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      setLoading(false);

      return user;
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);

      let systemErrorMessage;

      if (error.message.includes("invalid-email")) {
        systemErrorMessage = 'E-mail invalido, use o formato "nome@email.com"';
      } else if (error.message.includes("user-not-found")) {
        systemErrorMessage = "Usuário não encontrado."
      } else if (error.message.includes("wrong-password")) {
        systemErrorMessage = "Senha incorreta."
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde.";
      }

      setError(systemErrorMessage);
    }

    setLoading(false);
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  // "[]" vai ser executado apenas uma vez

  return {
    createUser,
    auth,
    error,
    loading,
    logout,
    login
  };
};
