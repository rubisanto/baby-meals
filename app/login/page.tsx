"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter(); // Initialise le router

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // Réinitialise les erreurs
    setIsLoading(true); // Active l'indicateur de chargement

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Échec de la connexion");
        setIsLoading(false); // Désactive l'indicateur de chargement
        return;
      }

      const data = await response.json();
      router.push("/meals"); // Redirige vers /meals
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsLoading(false); // Désactive l'indicateur de chargement
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Vérifie le format email
    return emailRegex.test(email);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-6 shadow-md rounded"
      >
        <h2 className="mb-4 text-2xl font-bold">Connexion</h2>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <label className="block mb-2">Email</label>
        <input
          className={`mb-4 w-full rounded border p-2 ${
            emailError ? "border-red-500" : ""
          }`}
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError(validateEmail(e.target.value) ? "" : "Veuillez entrer une adresse email valide.");
          }}
          required
        />
        {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
        <label className="block mb-2">Mot de passe</label>
        <input
          className="mb-4 w-full rounded border p-2"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          className={`w-full rounded py-2 text-white font-bold ${
            isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Chargement..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
}
