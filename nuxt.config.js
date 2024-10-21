const { API_URL, BASE_URL } = process.env;
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  server: {
    host: process.env.HOST || "0.0.0.0",
    port: process.env.PORT || 8080,
  },

  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css",
        },
      ],
    },
  },

  css: ["~/assets/style.css"],

  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],

  runtimeConfig: {
    public: {
      API_URL,
      BASE_URL,
    },
  },
});
