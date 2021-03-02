function boolFromEnv(key: string): boolean {
  const value = process.env[key] || "";
  return ["1", "true", "yes"].includes(value.toLowerCase());
}

export const useMock = boolFromEnv("REACT_APP_USE_MOCK");
