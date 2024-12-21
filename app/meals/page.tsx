"use client";

import { useState } from "react";

type Meal = {
  id: number;
  quantity: string;
  date: string;
};

export default function Meals() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!quantity) return;

    const now = new Date();
    const fullDate = date
      ? new Date(`${now.toISOString().split("T")[0]}T${date}`) // Combine la date actuelle avec l'heure choisie
      : now;

    setMeals([
      ...meals,
      { id: Date.now(), quantity, date: fullDate.toISOString() },
    ]);
    setQuantity("");
    setDate("");
  };

  const formatTime = (isoDate: string) => {
    const dateObj = new Date(isoDate);
    return dateObj.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDelete = (id: number) => {
    setMeals(meals.filter((meal) => meal.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
        <h1 className="mb-6 text-3xl font-extrabold text-center text-blue-600">
          Meals Tracker
        </h1>
        <form
          onSubmit={handleSubmit}
          className="mb-6 flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md"
        >
          <input
            type="number"
            placeholder="Quantité (en grammes)"
            className="w-full rounded border p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <input
            type="time"
            className="w-full rounded border p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button
            className="w-full rounded bg-blue-600 py-2 text-white font-bold hover:bg-blue-700 transition-colors"
            type="submit"
          >
            Ajouter un repas
          </button>
        </form>
        <ul className="space-y-4">
          {meals
            .sort((a, b) => b.id - a.id)
            .map((m) => (
              <li
                key={m.id}
                className="flex justify-between items-center rounded-lg border bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div>
                  <p className="font-medium text-gray-800">
                    Quantité : {m.quantity}
                  </p>
                  <p className="text-sm text-gray-500">
                    Heure : {formatTime(m.date)}
                  </p>
                </div>
                <button
                  className="rounded-full bg-red-500 p-2 text-white hover:bg-red-600 transition-colors"
                  onClick={() => handleDelete(m.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
