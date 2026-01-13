import { User } from "@/types/user";

// Fonction pour décoder le JWT sans vérification de signature (côté client uniquement)
export function decodeJWT(token: string): User | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      id: payload.sub,
      firstname: payload.firstname,
      lastname: payload.lastname,
      email: payload.email,
      role: payload.role,
      organisation: payload.organisation,
    };
  } catch (error) {
    console.error('Erreur lors du décodage du JWT:', error);
    return null;
  }
}

// Fonction pour vérifier si un token est expiré
export function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  } catch (error) {
    return true;
  }
}