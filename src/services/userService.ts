import User from "../models/User.js";

export const userService = {
    // Récupération des utilisateurs
    async getAll() {
        return await User.findAll();
    },

    // Création d'un utilisateur
    async create(data: { nom: string; prenom: string; age: number}) {
        return await User.create(data);
    },

    //Suppression d'un utilisateur
    async remove(id: string) {
        return await User.destroy({where: { id }});
    },

    //Calcule de la moyenne d'âge
    async getAverageAge() {
        const users = await User.findAll();
        if (users.length === 0) return "0";

        const sum = users.reduce((acc, user) => acc + user.age, 0);
        return (sum / users.length).toFixed(1);

    }
};