const KEY = "el_nigo_token";

export const authStore = {
  getToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(KEY);
  },
  setToken: (token: string) => {
    localStorage.setItem(KEY, token);
  },
  clear: () => {
    localStorage.removeItem(KEY);
  },
};
