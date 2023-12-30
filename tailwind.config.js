/** @type {import('tailwindcss').Config} */

import tailwindConfig from "@repo/tailwind-config";
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	presets: [tailwindConfig]
};
