import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Si intentó entrar a una ruta privada antes de loguearse, vuelve ahí; si no, va a /ejercicio-1
  const from = location.state?.from?.pathname || "/ejercicio-1";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const result = login(email, password);
    if (result.ok) {
      navigate(from, { replace: true });
    } else {
      setError(result.message);
    }
  };

  return (
    <main style={{ maxWidth: "400px", margin: "2rem auto", padding: "1.5rem" }}>
      <h2>Demo Login</h2>
      <p style={{ fontSize: "0.9rem", color: "#555" }}>
        Usa <strong>user@mail.com</strong> y contraseña <strong>123</strong>
      </p>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}
      >
        <div>
          <label htmlFor="email" style={{ display: "block", marginBottom: "0.25rem" }}>
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="user@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>

        <div>
          <label htmlFor="password" style={{ display: "block", marginBottom: "0.25rem" }}>
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="123"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>

        {error && (
          <p style={{ color: "crimson", margin: 0, fontSize: "0.9rem" }}>{error}</p>
        )}

        <button type="submit" style={{ padding: "0.6rem", cursor: "pointer" }}>
          Login
        </button>
      </form>
    </main>
  );
}