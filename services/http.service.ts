const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function http<T>(url: string, options?: RequestInit): Promise<T> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  try {
    const res = await fetch(`${API_URL}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options?.headers,
      },
    });

    if (!res.ok) {
      let error;
      try {
        error = await res.json();
      } catch {
        error = { message: `HTTP Error ${res.status}: ${res.statusText}` };
      }
      throw new Error(error.message || `Erreur ${res.status}: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error(`Impossible de se connecter au serveur. Vérifiez que l'API est démarrée sur ${API_URL}`);
    }
    throw error;
  }
}
