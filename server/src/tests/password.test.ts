import { validatePassword } from "../utils/password";

describe("Password Validator - White Box Testing", () => {
    it("devrait rejeter un mot de passe vide", () => {
        const result = validatePassword("", 25);
        expect(result).toBe(false);
    });

    it("Devrait accepter le mot de passe d'un enfant", () => {
        expect(validatePassword("ABcdEF123!", 11)).toBe(true);
    });

    it("devrait rejeter le mot de passe d'un enfant sans minuscule", () => {
        expect(validatePassword("ABCDEF123!", 11)).toBe(false);
    });

    it("devrait rejeter le mot de passe d'un senior sans chiffre ET sans majuscule", () => {
        expect(validatePassword("password!", 70)).toBe(false);
    });

    it("devrait accepter le mot de passe d'un senior valide (avec une majuscule)", () => {
        expect(validatePassword("Password!", 70)).toBe(true);
    });

    it("Devrait rejeter un mot de passe trop court", () => {
        expect(validatePassword("Ab123!", 25)).toBe(false);
    });

    it("Devrait rejeté un mot de passe trop long", () => {
        expect(validatePassword("A1b2C3d4E5f6G7h8I9j0K", 25)).toBe(false);
    });

    it("devrait rejeter un mot de passe sans caractère spécial", () => {
        expect(validatePassword("Password123", 25)).toBe(false);
    });

    it("devrait rejeter un mot de passe sans chiffre ET sans majuscule", () => {
        expect(validatePassword("abcdefgh!", 25)).toBe(false);
    });

    it("devrait rejeter un mot de passe sans minuscule", () => {
        expect(validatePassword("ABCDEF123!", 25)).toBe(false);
    });

    it("devrait accepter un mot de passe parfaitement valide", () => {
        expect(validatePassword("Anvers2024!", 25)).toBe(true);
    });

    });