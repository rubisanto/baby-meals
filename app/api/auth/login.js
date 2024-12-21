import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Stockage temporaire (remplace par une base de données)
const users = [{ email: "user@example.com", passwordHash: bcrypt.hashSync("1234", 10) }];

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    // Vérifie l'utilisateur
    const user = users.find((u) => u.email === email);
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ message: "Identifiants incorrects" });
    }

    // Génère le token JWT
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return res.status(200).json({ token });
  }

  res.setHeader("Allow", ["POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
