export default function handler(req, res) {
  const weight = parseFloat(req.query.weight || req.body?.weight);

  if (isNaN(weight)) {
    return res.status(400).json({ error: "Weight parameter is required." });
  }

  let category = "Indeterminado";
  let points = 0;

  if (weight < 0.1) {
    category = "Cables";
    points = 3;
  } else if (weight < 0.3) {
    category = "Baterías";
    points = 5;
  } else if (weight < 0.6) {
    category = "Celulares";
    points = 8;
  } else {
    category = "Grandes";
    points = 10;
  }

  const multiplier = 0.000084;
  const reward = parseFloat((points * multiplier).toFixed(8));

  res.status(200).json({
    ok: true,
    category,
    points,
    reward,
    multiplier,
    timestamp: new Date().toISOString()
  });
}
