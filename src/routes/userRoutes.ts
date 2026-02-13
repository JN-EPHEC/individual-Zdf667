import { Router } from "express";
import type { Request, Response } from "express";
import User from '../models/User.js'



const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
    const users = await User.findAll();
    res.json(users);
  } catch (error: any) {
    console.error("Erreur: ", error);
    res.status(500).json({message: "Erreur", detail: error.message});
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const { nom, prenom } = req.body;
    const newUser = await User.create({ nom, prenom });
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deletedCount = await User.destroy({ where: { id } });
    if (deletedCount === 0) return res.status(404).json({ message: "Non trouvé" });
    res.json({ message: "Utilisateur supprimé" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
export default router;