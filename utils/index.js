const getEnv = () =>
  import.meta.client ? { ...useRuntimeConfig().public } : {};

export const env = getEnv();
