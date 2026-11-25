// src/pages/HomePage.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function HomePage() {
  const { user, isAuthenticated } = useAuth();

  return (
    <main style={{ padding: "1.5rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Challenge 06</h1>
      {isAuthenticated ? (
        <p>
          Sesión iniciada como <strong>{user.username}</strong>. Accede a{" "}
          <Link to="/ejercicio-1">Ejercicio 1 (Pila de Libros)</Link> o{" "}
          <Link to="/ejercicio-2">Ejercicio 2 (Cola del ATM)</Link>.
        </p>
      ) : (
        <p>
          Inicia sesión en <Link to="/login">Demo Login</Link> con <strong>user@mail.com</strong> y{" "}
          <strong>123</strong> para ver las páginas privadas.
        </p>
      )}
    </main>
  );
}