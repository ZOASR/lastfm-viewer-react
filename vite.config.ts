import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import react from "@vitejs/plugin-react";
import path from "path";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		lib: {
			entry: path.resolve(__dirname, "index.ts"),
			name: "react-lastfm-viewer",
			fileName: (format) => `index.${format}.js`,
		},
		rollupOptions: {
			external: ["react", "react-dom"],
			output: {
				globals: {
					react: "react",
					"react-dom": "ReactDOM",
				},
			},
		},
		sourcemap: true,
		emptyOutDir: true,
	},
	plugins: [react(), libInjectCss(), nodePolyfills(), dts()],
});
