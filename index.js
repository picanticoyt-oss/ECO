import { useState } from "react";

export default function Home() {
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState(null);

  async function calculate() {
    if (!weight) return;

    const res = await fetch(`/api/calc?weight=${weight}`);
    const data = await res.json();
    setResult(data);
  }

  return (
    <div style={{ fontFamily: "Arial", maxWidth: 350, margin: "40px auto" }}>
      <h2>ECOBOX — Cálculo de Recompensa</h2>

      <label>Peso (kg)</label>
      <input
        type="number"
        step="0.001"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <button onClick={calculate} style={{ width: "100%", padding: 10 }}>
        Calcular
      </button>

      {result && (
        <div style={{ marginTop: 20, padding: 10, border: "1px solid #ccc" }}>
          <p><b>Categoría:</b> {result.category}</p>
          <p><b>Puntos:</b> {result.points}</p>
          <p><b>Recompensa:</b> {result.reward} ECO</p>
          <p style={{ fontSize: 12, opacity: 0.7 }}>
            {result.timestamp}
          </p>
        </div>
      )}
    </div>
  );
}
