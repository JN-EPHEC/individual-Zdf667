import { calculateShipping } from "../utils/shipping";

describe("Shipping Service - N-Wise Testing", () => {
  const pairwiseCases = [
    // ID | Distance | Poids | Type | Résultat attendu
    [10, 5, 'standard', 10],   // D1, W1, T1
    [10, 20, 'express', 30],   // D1, W2, T2 -> (10 + 50%) * 2 = 30
    [100, 5, 'express', 50],   // D2, W1, T2 -> (25 + 0%) * 2 = 50
    [100, 20, 'standard', 37.5], // D2, W2, T1 -> (25 + 50%) * 1 = 37.5
    [600, 5, 'express', 100],  // D3, W1, T2 -> (50 + 0%) * 2 = 100
    [600, 20, 'standard', 75],  // D3, W2, T1 -> (50 + 50%) * 1 = 75
  ];

  test.each(pairwiseCases)(
    "Pairwise ID %#: dist=%i, poids=%i, type=%s devrait retourner %p",
    (dist, weight, type, expected) => {
      expect(calculateShipping(dist as number, weight as number, type as any)).toBe(expected);
    }
  );
});