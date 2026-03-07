export type UserRole = "admin" | "user" | "stagiaire";

export function validateUserRegistration(age: number, role: string, email: string): boolean {
  // âge
  if (age < 0 || age > 120) throw new Error("Âge invalide");
  
  // Validation du rôle
  const validRoles = ["admin", "user", "stagiaire"];
  if (!validRoles.includes(role)) throw new Error("Rôle invalide");

  //email
  if (!email.includes("@") || !email.includes(".")) return false;

  // âge/rôle
  if (age < 18 && role !== "stagiaire") return false;

  return true;
}