import "./App.css";

import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

// HOOKS
import { useState, useEffect } from "react";
import { useAuthentication } from "./hooks/useAuthentication";

// PROVIDER
import { AuthProvider } from "./contexts/AuthContext";

// PAGES
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import NewPost from "./pages/NewPost/NewPost";
import Dashboard from "./pages/Dashboard/Dashboard";
import Search from "./pages/Search/Search";
import SinglePost from "./pages/SinglePost/SinglePost";
import EditPost from "./pages/EditPost/EditPost"

// COMPONENTS
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return (
      <p style={{ textAlign: "center", paddingTop: "10px" }}>Carregando...</p>
    );
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            {user && <p className="displayName">{user.displayName}</p>}
            {!user && <Link to="/login" className="displayName">Logar</Link>}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sobre" element={<About />} />
              <Route path="/search" element={<Search />} />
              <Route
                path="/cadastro"
                element={!user ? <Register /> : <Navigate to="/" />}
              />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/posts/criar"
                element={user ? <NewPost /> : <Navigate to="/" />}
              />
              <Route
                path="/dashboard"
                element={user ? <Dashboard /> : <Navigate to="/" />}
              />
              <Route path="/posts/:id" element={<SinglePost />} />
              <Route path="/posts/edit/:id" element={<EditPost />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
