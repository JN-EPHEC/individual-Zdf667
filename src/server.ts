import express from "express";
import type { Request, Response } from "express";
import sequelize from "./config/database";
import "./models/User";

// --- Types et Données (Tes données de test) ---
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

// --- Middlewares ---
app.use(express.json()); 

// --- Routes ---
app.get("/api/users", async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération", error });
  }
});

app.post("/api/users", async (req: Request, res: Response) => {
  try {
    const { nom, prenom } = req.body;
    const newUser = await User.create({ nom, prenom });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la création", error });
  }
});

app.delete("/api/users/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deletedCount = await User.destroy({ where: { id } });

    if (deletedCount === 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression", error });
  }
});


app.get("/", (req: Request, res: Response) => {
  res.send("Bienvenue sur mon serveur API");
});

app.get("/api/data", (req: Request, res: Response) => {
  res.json(etudiants);
});

app.get("/api/hello/:name", (req: Request<{ name: string }>, res: Response) => {
  const name: string = req.params.name;
  res.json({
    message: `Bonjour ${name}`,
    timeStamp: new Date().toISOString(),
  });
});

// --- Démarrage de la Base de Données et du Serveur ---

async function startServer() {
  try {
    // 1. Test de la connexion
    await sequelize.authenticate();
    console.log("✅ Connexion à la base de données réussie !");

    // 2. Synchronisation des modèles (Crée la table 'users' si elle n'existe pas)
    // L'option { alter: true } met à jour la structure si tu modifies le modèle
    await sequelize.sync({ alter: true });
    console.log("✅ Base de données synchronisée (Table 'users' prête).");

    // 3. Lancement du serveur Express
    app.listen(PORT, () => {
      console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Impossible de démarrer le serveur :", error);
  }
}

startServer();
