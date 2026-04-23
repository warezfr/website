import node from "@astrojs/node";
import react from "@astrojs/react";
import { auditLogPlugin } from "@emdash-cms/plugin-audit-log";
import { defineConfig, fontProviders } from "astro/config";
import emdash, { local } from "emdash/astro";
import { sqlite } from "emdash/db";

export default defineConfig({
        output: "server",
        adapter: node({
                mode: "standalone",
        }),
        image: {
                layout: "constrained",
                responsiveStyles: true,
        },
        integrations: [
                react(),
                emdash({
                        database: sqlite({ url: "file:./data.db" }),
                        storage: local({
                                directory: "./uploads",
                                baseUrl: "/_emdash/api/media/file",
                        }),
                        plugins: [auditLogPlugin()],
                }),
        ],
        fonts: [
                {
                        provider: fontProviders.google(),
                        name: "IBM Plex Sans",
                        cssVariable: "--font-sans",
                        weights: [400, 500, 600, 700],
                        fallbacks: ["system-ui", "sans-serif"],
                },
                {
                        provider: fontProviders.google(),
                        name: "Source Serif 4",
                        cssVariable: "--font-serif",
                        weights: [400, 500, 600, 700],
                        styles: ["normal", "italic"],
                        fallbacks: ["Georgia", "serif"],
                },
                {
                        provider: fontProviders.google(),
                        name: "JetBrains Mono",
                        cssVariable: "--font-mono",
                        weights: [400, 500],
                        fallbacks: ["monospace"],
                },
        ],
        server: {
                host: "0.0.0.0",
                port: 3000,
                allowedHosts: true,
        },
        devToolbar: { enabled: false },
});
