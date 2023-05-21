/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "#0F0D13",
				primary: "#2A2141",
			},
			fontFamily: {
				sans: `var(--font-roboto)`,
			},
		},
	},
	plugins: [],
};
