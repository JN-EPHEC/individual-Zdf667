import express from "express";
import type { Request, Response } from "express";


const app = express();
const PORT = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Bienvenue sur mon serveur API");
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
