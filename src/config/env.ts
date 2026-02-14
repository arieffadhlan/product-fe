const getEnv = (key: string): string => {
  const value = import.meta.env[`VITE_APP_${key}`];
  if (!value) {
    throw new Error(`Invalid env: ${key} is missing.`);
  }

  return value;
};

export const env = {
  API_URL: getEnv("API_URL"),
  APP_URL: getEnv("APP_URL"),
} as const;
