import { Router } from "express";
import type { Request, Response } from "express";
import User from '../models/User'
import { userService } from "../services/userService";
import * as userController from "../controllers/userController";
import { checkIdParam } from '../middlewares/validation';



const router = Router();

/**
 * @swagger
 * /api/users/stats:
 *   get:
 *     summary: Récupère la moyenne d'âge des utilisateurs
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Succès
 */
router.get("/stats", async (req: Request, res: Response) => {
    try{
      const average = await userService.getAverageAge();
      res.json({ averageAge: average });
    } catch (error) {
        console.error("Erreur GET /stats:", error);
      res.status(500).json({message: "Erreur stats" });
    }
});

/**
 * @swagger
 * /api/users:
 *   get:
 *    summary: Récupère la liste de tous les utilisateurs
 *    responses:
 *       200:
 *         description: Liste récupérée avec succès
 */
router.get("/", userController.getAllUsers);


/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Récupère un utilisateur par son ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Utilisateur trouvé
 *       404:
 *         description: Non trouvé
 */
router.get('/:id', checkIdParam, userController.getUserById);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              nom:
 *                type: string
 *              prenom:
 *                type: string
 *              age:
 *               type: integer
 *     responses:
 *      201:
 *        description: Créé
 */
router.post('/', userController.createUser);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Met à jour un utilisateur existant
 *     tags: [Users]
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *     responses:
 *      200:
 *        description: Mis à jour
 */
router.put('/:id', checkIdParam, userController.updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Supprime un utilisateur par son ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Supprimé
 */
router.delete('/:id', checkIdParam, userController.deleteUser);

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