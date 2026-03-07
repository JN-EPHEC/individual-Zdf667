import { validatePassword } from "../utils/password";

describe("Password Validator - White Box Testing", () => {
    // Test initial pour initialiser le rapport de couverture
    // Ce test ne couvre que la première ligne de la fonction (Branch 1)
    it("devrait rejeter un mot de passe vide", () => {
        const result = validatePassword("", 25);
        expect(result).toBe(false);
    });
    
    // TODO: Ajoutez vos tests ici pour atteindre 100% de couverture...
});