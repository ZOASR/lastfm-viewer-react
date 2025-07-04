import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import viteConfigs from "@lastfm-viewer/vite-config";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), ...viteConfigs.plugins],
	define: viteConfigs.define,
	build: {
		...viteConfigs.build,
		lib: {
			entry: path.resolve(__dirname, "index.ts"),
			name: "@lastfm-viewer/react",
			fileName: (format) => `index.${format}.js`
		},
		rollupOptions: {
			external: ["react", "react-dom"],
			output: {
				globals: {
					react: "react",
					"react-dom": "ReactDOM"
				},
				sourcemapExcludeSources: true
			}
		}
	}
});
