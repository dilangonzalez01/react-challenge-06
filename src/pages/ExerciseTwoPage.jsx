import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function randomArrivalDate() {
  const now = Date.now();
  // Genera una fecha aleatoria dentro de las últimas 2 horas (en milisegundos)
  const randomOffsetMs = Math.floor(Math.random() * 2 * 60 * 60 * 1000);
  return new Date(now - randomOffsetMs).toISOString();
}

const INITIAL_QUEUE = [
  {
    id: 1,
    name: "Ana Gómez",
    withdrawalAmount: 150000,
    arrivalDate: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    name: "Carlos Pérez",
    withdrawalAmount: 80000,
    arrivalDate: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
  },
].sort((a, b) => new Date(a.arrivalDate) - new Date(b.arrivalDate));

export function ExerciseTwoPage() {
  const { user } = useAuth();
  const [queue, setQueue] = useState(INITIAL_QUEUE);
  const [name, setName] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");

  const handleEnqueuePerson = (e) => {
    e.preventDefault();
    const numericAmount = Number(withdrawalAmount);
    if (!name.trim() || Number.isNaN(numericAmount) || numericAmount <= 0) return;

    const newPerson = {
      id: Date.now(),
      name: name.trim(),
      withdrawalAmount: numericAmount,
      arrivalDate: randomArrivalDate(),
    };

    // enqueue + orden cronológico por fecha de llegada (FIFO)
    setQueue((prevQueue) =>
      [...prevQueue, newPerson].sort(
        (a, b) => new Date(a.arrivalDate) - new Date(b.arrivalDate)
      )
    );

    setName("");
    setWithdrawalAmount("");
  };

  const handleDequeuePerson = () => {
    // dequeue: atiende/retira al primero de la cola
    setQueue((prevQueue) => prevQueue.slice(1));
  };

  return (
    <main style={{ padding: "1.5rem", maxWidth: "800px", margin: "0 auto" }}>
      <h2>Challenge 05 — Cola en Cajero Automático / ATM (FIFO)</h2>
      <p>
        Usuario actual: <strong>{user?.username}</strong>
      </p>

      <form
        onSubmit={handleEnqueuePerson}
        style={{
          display: "flex",
          gap: "0.75rem",
          flexWrap: "wrap",
          marginBottom: "1rem",
        }}
      >
        <input
          type="text"
          placeholder="Nombre de la persona"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ padding: "0.5rem", flex: "1 1 200px" }}
        />
        <input
          type="number"
          min="1"
          step="any"
          placeholder="Monto de retiro"
          value={withdrawalAmount}
          onChange={(e) => setWithdrawalAmount(e.target.value)}
          required
          style={{ padding: "0.5rem", flex: "1 1 160px" }}
        />
        <button type="submit" style={{ padding: "0.5rem", cursor: "pointer" }}>
          Agregar a la cola (enqueue)
        </button>
        <button
          type="button"
          onClick={handleDequeuePerson}
          disabled={queue.length === 0}
          style={{ padding: "0.5rem", cursor: "pointer" }}
        >
          Atender siguiente (dequeue)
        </button>
      </form>

      <h3>Cola ordenada por fecha de llegada</h3>
      {queue.length === 0 ? (
        <p>No hay personas en la cola del cajero.</p>
      ) : (
        <ol style={{ display: "flex", flexDirection: "column", gap: "0.5rem", paddingLeft: "1.25rem" }}>
          {queue.map((person, index) => (
            <li
              key={person.id}
              style={{
                padding: "0.75rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            >
              {index === 0 && <strong>[SIGUIENTE EN ATENDER - FIFO] </strong>}
              <strong>{person.name}</strong> — Retiro: ${person.withdrawalAmount} | Llegada:{" "}
              {new Date(person.arrivalDate).toLocaleString()}
            </li>
          ))}
        </ol>
      )}
    </main>
  );
}