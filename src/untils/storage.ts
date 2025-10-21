export const storagePrefix = "clinic-booking";

let accessToken: string | undefined | null;
let tkInfo: any;

export const memoryStorage = {
  getAccessToken: () => accessToken,
  setAccessToken: (token: string | undefined | null) => {
    accessToken = token;
  },
  getTokenInfo: () => tkInfo,
  setTokenInfo: (data: any) => {
    tkInfo = data;
  },
};

const storage = {
  setToken: (token: string) => {
    window.localStorage.setItem(`${storagePrefix}-token`, token);
  },
  getToken: (): string | null => {
    return window.localStorage.getItem(`${storagePrefix}-token`);
  },
  clearToken: () => {
    window.localStorage.removeItem(`${storagePrefix}-token`);
  },

  setTokenInfo: (tokenInfo: any) => {
    window.localStorage.setItem(
      `${storagePrefix}-tokenInfo`,
      JSON.stringify(tokenInfo)
    );
  },
  getTokenInfo: () => {
    const raw = window.localStorage.getItem(`${storagePrefix}-tokenInfo`);
    return raw ? JSON.parse(raw) : null;
  },
  clearTokenInfo: () => {
    window.localStorage.removeItem(`${storagePrefix}-tokenInfo`);
  },

  set: (key: string, value: any) => {
    window.localStorage.setItem(
      `${storagePrefix}-${key}`,
      JSON.stringify(value)
    );
  },
  get: (key: string) => {
    const raw = window.localStorage.getItem(`${storagePrefix}-${key}`);
    return raw ? JSON.parse(raw) : null;
  },
  clear: (key: string) => {
    window.localStorage.removeItem(`${storagePrefix}-${key}`);
  },
  getStorageKey: (key: string) => `${storagePrefix}-${key}`,
};

export default storage;
