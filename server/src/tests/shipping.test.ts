import { calculateShipping } from "../utils/shipping";

describe("Shipping Service - Catalog Based Testing", () => {
  // Structure du tableau : [distance, poids, type, résultat attendu ou erreur]
  const testCases = [
    [10, 5, 'standard', 10],            // Cas de base
    [50, 5, 'standard', 10],            // Bordure distance 50
    [51, 5, 'standard', 25],            // Passage palier 51
    [500, 5, 'standard', 25],           // Bordure distance 500
    [501, 5, 'standard', 50],           // Passage palier 501
    [10, 10, 'standard', 15],           // Majoration poids 10kg (+50%)
    [10, 50, 'standard', 15],           // Bordure poids 50kg
    [10, 5, 'express', 20],             // Option Express (10 * 2)
    [100, 20, 'express', 75],           // Mix (25 + 50%) * 2
  ];

  test.each(testCases)(
    "pour dist=%i, poids=%i, type=%s, devrait retourner %p",
    (dist, weight, type, expected) => {
        expect(calculateShipping(dist as number, weight as number, type as any)).toBe(expected);
    }
  );

  // Pour les erreurs, on fait des tests séparés ou un autre test.each
  it("devrait lever une erreur pour une distance négative", () => {
    expect(() => calculateShipping(-1, 10, 'standard')).toThrow("Invalid distance");
  });

  it("devrait lever une erreur pour un poids invalide", () => {
    expect(() => calculateShipping(10, 0, 'standard')).toThrow("Invalid weight");
    expect(() => calculateShipping(10, 51, 'standard')).toThrow("Invalid weight");
  });
});