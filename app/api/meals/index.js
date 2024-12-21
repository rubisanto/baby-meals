let meals = []; // Remplace par une base de données dans le futur.

export default function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json(meals);
  }

  if (req.method === "POST") {
    const { quantity, date } = req.body;

    if (!quantity) {
      return res.status(400).json({ message: "La quantité est obligatoire." });
    }

    const newMeal = { id: Date.now(), quantity, date: date || new Date().toISOString() };
    meals.push(newMeal);
    return res.status(201).json(newMeal);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
