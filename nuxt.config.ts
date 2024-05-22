export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    "~/assets/css/vue-draggable-resizable.css",
    "~/assets/css/main.css",
  ],
  ssr: false,
  modules: ["@pinia/nuxt"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  plugins: [
    {
      src: "~/plugins/vue-draggable-resizable.js",
      mode: "client",
    },
  ],
});
