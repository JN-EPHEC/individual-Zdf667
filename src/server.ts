import express from "express";
import sequelize from "./config/database";
import userRoutes from "./routes/userRoutes";
import { requestLogger } from './middlewares/logger';
import { errorHandler } from "./middlewares/errorHandler";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

const app = express();
const PORT = 3000;

// --- Middlewares ---
app.use(express.json());
app.use(requestLogger);

// --- Swagger ---
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --- Routes ---
app.use("/api/users", userRoutes);
app.use(express.static("public"));
app.get("/", (request, response) => response.send("Bienvenue sur l'api Sequelize"));

// --- Erreur en dernier ---
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
