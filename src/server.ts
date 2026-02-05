import express from "express";
import type { Request, Response } from "express";

interface Etudiant {
  id: number;
  nom: string;
  prenom: string;
}

const etudiants: Etudiant[] = [
  { id: 1, nom: "Dupont", prenom: "Jean" },
  { id: 2, nom: "Martin", prenom: "Sophie" },
  { id: 3, nom: "Doe", prenom: "John" },
];

const app = express();
const PORT = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Bienvenue sur mon serveur API");
});

app.get("/api/data", (req: Request, res: Response) => {
  res.json(etudiants);
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
