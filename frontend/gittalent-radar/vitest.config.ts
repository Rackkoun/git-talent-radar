import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [react()],
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: ["./src/test/setup.ts"],
        coverage: {
            provider: "v8",
            reporter: ["text", "json", "html"],
            exclude: [
                "dist/**",
                "coverage/**",
                "node_modules/**",
                "src/test/",
                "**/*.d.ts",
                "**/*.config.*",
                "**/mock*.ts",
                // ignore shadcn components
                "src/components/ui/**",
                // ignore entry points and wrappers
                "src/main.tsx",
                "src/App.tsx",
                // ignore pure interfaces
                "src/types/**",
                // ignore API, they are tested via integrations
                "src/services/**",
                // tests
                "**/__tests__/**",
                "**/*.test.tsx",
                "**/*.test.ts",
            ],
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});