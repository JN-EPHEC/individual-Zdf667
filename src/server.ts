import express from "express";
import type { Request, Response } from "express";
import userRoutes from "./routes/userRoutes.js";
import sequelize from "./config/database.js";

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

sequelize.authenticate()
  .then(() => {
    console.log("Connexion à la base de données réussie !");
  })
  .catch((error: unknown) => {
    console.error("Impossible de se connecter à la base :", error);
  });

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});

app.get("/api/hello/:name", (req: Request<{name: string}>, res: Response) => {
  const name: string = req.params.name;

  const response = {
    message: `Bonjour ${name}`,
    timeStamp: new Date().toISOString(),
  };

  res.json(response);
  }
)
app.use("/api", userRoutes);