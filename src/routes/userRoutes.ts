import { Router } from "express";
import type { Request, Response } from "express";
import User from '../models/User.js'
import { userService } from "../services/userService.js";



const router = Router();

router.get("/stats", async (req: Request, res: Response) => {
    try{
      const average = await userService.getAverageAge();
      res.json({ averageAge: average });
    } catch (error) {
        console.error("Erreur GET /stats:", error);
      res.status(500).json({message: "Erreur stats" });
    }
});

router.get("/", async (req: Request, res: Response) => {
    try {
      const users = await userService.getAll();
      res.json(users);
    } catch (error) {
        console.error("Erreur GET /:", error);
      res.status(500).json({ message: "Erreur lors de la récupération" });
    }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const { nom, prenom, age } = req.body;

    //Vérification de données
    if (!nom || !prenom || age === undefined) {
        return res.status(400).json({ message: "Données incomplète" });
    }

    if (isNaN(age) || age < 0 || age > 110) {
        return res.status(400).json({ message: "L'âge doit être un nombre entre 0 et 110"});
    }

    const newUser = await User.create({ nom, prenom, age });
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const deletedCount = await userService.remove(id);

    if (deletedCount === 0) return res.status(404).json({ message: "Non trouvé" });
    res.json({ message: "Utilisateur supprimé" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
export default router;