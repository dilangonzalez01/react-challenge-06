import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const INITIAL_BOOKS = [
  {
    id: 1,
    name: "Clean Code",
    isbn: "978-0132350884",
    author: "Robert C. Martin",
    editorial: "Prentice Hall",
  },
  {
    id: 2,
    name: "JavaScript: The Good Parts",
    isbn: "978-0596517748",
    author: "Douglas Crockford",
    editorial: "O'Reilly Media",
  },
];

export function ExerciseOnePage() {
  const { user } = useAuth();
  const [stack, setStack] = useState(INITIAL_BOOKS);
  const [name, setName] = useState("");
  const [isbn, setIsbn] = useState("");
  const [author, setAuthor] = useState("");
  const [editorial, setEditorial] = useState("");

  const handlePushBook = (e) => {
    e.preventDefault();
    if (!name.trim() || !isbn.trim() || !author.trim() || !editorial.trim()) return;

    const newBook = {
      id: Date.now(),
      name: name.trim(),
      isbn: isbn.trim(),
      author: author.trim(),
      editorial: editorial.trim(),
    };

    // push: agrega un nuevo elemento al tope/final de la pila (LIFO)
    setStack((prevStack) => [...prevStack, newBook]);

    setName("");
    setIsbn("");
    setAuthor("");
    setEditorial("");
  };

  const handlePopBook = () => {
    // pop: extrae y devuelve el último elemento agregado (LIFO)
    setStack((prevStack) => prevStack.slice(0, -1));
  };

  // En una pila LIFO, el tope es el último elemento insertado
  const topBook = stack.length > 0 ? stack[stack.length - 1] : null;
  const displayStack = [...stack].reverse();

  return (
    <main style={{ padding: "1.5rem", maxWidth: "800px", margin: "0 auto" }}>
      <h2>Challenge 04 — Pila de Libros (LIFO)</h2>
      <p>
        Usuario actual: <strong>{user?.username}</strong>
      </p>

      <form
        onSubmit={handlePushBook}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
          gap: "0.75rem",
          marginBottom: "1rem",
        }}
      >
        <input
          type="text"
          placeholder="Name (Nombre)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ padding: "0.5rem" }}
        />
        <input
          type="text"
          placeholder="ISBN"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          required
          style={{ padding: "0.5rem" }}
        />
        <input
          type="text"
          placeholder="Author (Autor)"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          style={{ padding: "0.5rem" }}
        />
        <input
          type="text"
          placeholder="Editorial"
          value={editorial}
          onChange={(e) => setEditorial(e.target.value)}
          required
          style={{ padding: "0.5rem" }}
        />
        <button type="submit" style={{ padding: "0.5rem", cursor: "pointer" }}>
          Agregar a la pila (push)
        </button>
      </form>

      <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1rem" }}>
        <button
          type="button"
          onClick={handlePopBook}
          disabled={stack.length === 0}
          style={{ padding: "0.5rem", cursor: "pointer" }}
        >
          Sacar tope (pop)
        </button>
        <span>
          Tope actual (peek): <strong>{topBook ? topBook.name : "Pila vacía"}</strong>
        </span>
      </div>

      <h3>Libros en la pila (del tope a la base)</h3>
      {displayStack.length === 0 ? (
        <p>No hay libros en la pila.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {displayStack.map((book, index) => (
            <li
              key={book.id}
              style={{
                padding: "0.75rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            >
              {index === 0 && <strong>[TOPE - LIFO] </strong>}
              <strong>{book.name}</strong> — Autor: {book.author} | ISBN: {book.isbn} | Editorial:{" "}
              {book.editorial}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}