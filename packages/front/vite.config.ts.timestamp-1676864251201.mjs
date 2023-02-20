// vite.config.ts
import { defineConfig } from "file:///home/eronads/repos/todoMERN/node_modules/.pnpm/vite@4.0.4/node_modules/vite/dist/node/index.js";
import react from "file:///home/eronads/repos/todoMERN/node_modules/.pnpm/@vitejs+plugin-react@3.0.1_vite@4.0.4/node_modules/@vitejs/plugin-react/dist/index.mjs";
import relay from "file:///home/eronads/repos/todoMERN/node_modules/.pnpm/vite-plugin-relay@2.0.0_xgag4wawcxds6igpj6mohcf7ry/node_modules/vite-plugin-relay/dist/plugin.js";
var vite_config_default = defineConfig({
  plugins: [react(), relay],
  server: {
    proxy: {
      "/graphql": "http://localhost:3001",
      "/login": "http://localhost:3001",
      "/verify": "http://localhost:3001"
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9lcm9uYWRzL3JlcG9zL3RvZG9NRVJOL3BhY2thZ2VzL2Zyb250XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9lcm9uYWRzL3JlcG9zL3RvZG9NRVJOL3BhY2thZ2VzL2Zyb250L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2Vyb25hZHMvcmVwb3MvdG9kb01FUk4vcGFja2FnZXMvZnJvbnQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuaW1wb3J0IHJlbGF5IGZyb20gXCJ2aXRlLXBsdWdpbi1yZWxheVwiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3JlYWN0KCksIHJlbGF5XSxcbiAgc2VydmVyOiB7XG4gICAgcHJveHk6IHtcbiAgICAgIFwiL2dyYXBocWxcIjogXCJodHRwOi8vbG9jYWxob3N0OjMwMDFcIixcbiAgICAgIFwiL2xvZ2luXCI6IFwiaHR0cDovL2xvY2FsaG9zdDozMDAxXCIsXG4gICAgICBcIi92ZXJpZnlcIjogXCJodHRwOi8vbG9jYWxob3N0OjMwMDFcIixcbiAgICB9LFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW1ULFNBQVMsb0JBQW9CO0FBQ2hWLE9BQU8sV0FBVztBQUNsQixPQUFPLFdBQVc7QUFHbEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sR0FBRyxLQUFLO0FBQUEsRUFDeEIsUUFBUTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0wsWUFBWTtBQUFBLE1BQ1osVUFBVTtBQUFBLE1BQ1YsV0FBVztBQUFBLElBQ2I7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
