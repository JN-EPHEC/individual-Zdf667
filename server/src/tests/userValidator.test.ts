import { validateUserRegistration } from "../utils/userValidator";

describe("validateUserRegistration - White Box Testing", () => {
  test("devrait valider un utilisateur adulte standard", () => {
    expect(validateUserRegistration(25, "user", "test@ephec.be")).toBe(true);
  });

  test("devrait lever une erreur pour un âge > 120", () => {
    expect(() => validateUserRegistration(150, "admin", "a@b.c")).toThrow("Âge invalide");
  });

  test("devrait lever une erreur pour un rôle inexistant", () => {
    expect(() => validateUserRegistration(20, "modérateur", "a@b.c")).toThrow("Rôle invalide");
  });

  test("devrait refuser un email sans @ ou sans point", () => {
    expect(validateUserRegistration(20, "user", "testat.be")).toBe(false);
    expect(validateUserRegistration(20, "user", "test@be")).toBe(false);
  });

  test("devrait refuser un mineur qui n'est pas stagiaire", () => {
    expect(validateUserRegistration(17, "user", "a@b.c")).toBe(false);
  });

  test("devrait accepter un mineur si il est stagiaire", () => {
    expect(validateUserRegistration(16, "stagiaire", "a@b.c")).toBe(true);
  });
});