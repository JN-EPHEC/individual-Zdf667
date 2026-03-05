import { type Request, type Response, type NextFunction } from 'express';

export const checkIdParam = (req: Request, res: Response, next: NextFunction) => {
    const rawId = req.params.id;
    const idStr = (Array.isArray(rawId) ? rawId[0] : rawId) as string;
    const id = parseInt(idStr);

    if (isNaN(id)) {
        return res.status(400).json({ 
            message: "Format d'ID invalide. Un nombre entier est attendu." 
        });
    }

    next();
};