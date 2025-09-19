import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
    plugins: [react()],
    root: "resources",
    build: {
        outDir: "../public/build",
        emptyOutDir: true,
        manifest: true,
        rollupOptions: {
            input: {
                app: resolve(__dirname, "resources/js/app.tsx"),
            },
            external: [/^\/@vite\/client/, /^\/@react-refresh/],
        },
    },
    define: {
        "process.env.NODE_ENV": JSON.stringify(
            process.env.NODE_ENV || "production",
        ),
        "import.meta.env.PROD": JSON.stringify(true),
        "import.meta.env.DEV": JSON.stringify(false),
    },
    server: {
        host: true,
        port: 5173,
        cors: true,
    },
});
