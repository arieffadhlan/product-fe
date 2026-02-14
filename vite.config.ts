import react from "@vitejs/plugin-react-swc";
import generouted from "@generouted/react-router/plugin";
import { defineConfig } from "vite";
import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), generouted(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://dummyjson.com/',
        secure: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
    extensions: [
      ".js", 
      ".ts", 
      ".json",
      ".jsx", 
      ".tsx", 
    ],
  },
  assetsInclude: ["**/*.lottie"],
  build: {
    cssMinify: "lightningcss",
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        format: "es",
        sourcemap: false,
        entryFileNames: "js/[name]-[hash].js",
        chunkFileNames: "js/[name]-[hash].js",
        hoistTransitiveImports: true,
        manualChunks(id) {
          if (id.includes("react") || id.includes("react-dom") || id.includes("react-router")) return "vendor-react";
          if (id.includes("axios") || id.includes("dayjs")) return "vendor-utils";
          if (id.includes("lucide")) return "vendor-icons";
        }
      },
    },
    modulePreload: {
      polyfill: true,
      resolveDependencies: (_, deps) => deps,
    },
  },
  esbuild: {
    legalComments: "none",
    drop: process.env.NODE_ENV === "production" 
      ? ["console", "debugger"] 
      : [],
  },
  optimizeDeps: {
    include: [
      "dayjs",
      "react",
      "react-dom",
      "react-hook-form",
      "lucide-react",
      "react-router",
      "react-select",
      "@hookform/resolvers",
      "tailwind-merge",
      "valibot",
      "zustand",
    ],
  },
})
