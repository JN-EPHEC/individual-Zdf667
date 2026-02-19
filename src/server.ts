import express from "express";
import sequelize from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
import { requestLogger } from './middlewares/logger';
import { errorHandler } from "./middlewares/errorHandler.js";


const app = express();
const PORT = 3000;

// --- Middlewares ---
app.use(express.json());
app.use(requestLogger);

app.use("/api/users", userRoutes);
app.use(express.static("public"));
app.get("/", (request, response) => response.send("Bienvenue sur l'api Sequelize"));
app.use(errorHandler);

// --- Démarrage de la Base de Données et du Serveur ---

async function startServer() {
  try {
    // 1. Test de la connexion
    await sequelize.authenticate();
    console.log("Connexion à la base de données réussie !");

    await sequelize.sync({alter: true});
    console.log("Base de données synchronisée.");

    // 3. Lancement du serveur Express
    app.listen(PORT, () => {
      console.log(`Serveur lancé sur http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Impossible de démarrer le serveur :", error);
  }
}

startServer();
