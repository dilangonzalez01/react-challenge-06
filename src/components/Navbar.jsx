import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <nav
      style={{
        display: "flex",
        gap: "1rem",
        alignItems: "center",
        padding: "1rem",
        borderBottom: "1px solid #ccc",
        flexWrap: "wrap",
      }}
    >
      <Link to="/">Inicio</Link>

      {isAuthenticated && (
        <>
          <Link to="/ejercicio-1">Ejercicio 1 (Pila de Libros)</Link>
          <Link to="/ejercicio-2">Ejercicio 2 (Cola ATM)</Link>
        </>
      )}

      <div style={{ marginLeft: "auto", display: "flex", gap: "0.75rem", alignItems: "center" }}>
        {isAuthenticated ? (
          <>
            <span>
              Usuario: <strong>{user.username}</strong>
            </span>
            <button type="button" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}