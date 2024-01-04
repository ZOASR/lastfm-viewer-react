/** @type {import('tailwindcss').Config} */

import tailwindConfig from "@lastfm-viewer/tailwind-config";
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	presets: [tailwindConfig]
};
