import { defineConfig } from "vite";
import { threeMinifier } from "@yushijinhun/three-minifier-rollup";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [{ ...threeMinifier(), enforce: "pre" }, react()],
});
