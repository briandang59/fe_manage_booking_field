import type { Config } from "tailwindcss";

export default {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            colors: {
                bg: "var(--color-bg)",
                surface: "var(--color-surface)",
                "surface-2": "var(--color-surface-2)",
                border: "var(--color-border)",

                text: "var(--color-text)",
                "text-muted": "var(--color-text-muted)",
                "text-inverse": "var(--color-text-inverse)",

                primary: {
                    50: "var(--color-primary-50)",
                    100: "var(--color-primary-100)",
                    200: "var(--color-primary-200)",
                    300: "var(--color-primary-300)",
                    400: "var(--color-primary-400)",
                    500: "var(--color-primary-500)",
                    600: "var(--color-primary-600)",
                    700: "var(--color-primary-700)",
                    800: "var(--color-primary-800)",
                    900: "var(--color-primary-900)",
                    950: "var(--color-primary-950)",
                    DEFAULT: "var(--color-primary-300)",
                },

                gray: {
                    50: "var(--color-gray-50)",
                    100: "var(--color-gray-100)",
                    200: "var(--color-gray-200)",
                    300: "var(--color-gray-300)",
                    400: "var(--color-gray-400)",
                    500: "var(--color-gray-500)",
                    600: "var(--color-gray-600)",
                    700: "var(--color-gray-700)",
                    800: "var(--color-gray-800)",
                    900: "var(--color-gray-900)",
                    950: "var(--color-gray-950)",
                    DEFAULT: "var(--color-gray-500)",
                },

                success: {
                    50: "#f0fdf4",
                    100: "#dcfce7",
                    200: "#bbf7d0",
                    300: "#86efac",
                    400: "#4ade80",
                    500: "#22c55e",
                    600: "#16a34a",
                    700: "#15803d",
                    800: "#166534",
                    900: "#14532d",
                    950: "#052e16",
                    DEFAULT: "#22c55e",
                },

                warning: {
                    50: "#fffbeb",
                    100: "#fef3c7",
                    300: "#fcd34d",
                    500: "#f59e0b",
                    700: "#b45309",
                    900: "#78350f",
                    DEFAULT: "#f59e0b",
                },

                danger: {
                    50: "#fef2f2",
                    100: "#fee2e2",
                    300: "#fca5a5",
                    500: "#ef4444",
                    700: "#b91c1c",
                    900: "#7f1d1d",
                    DEFAULT: "#ef4444",
                },
            },

            fontFamily: {
                sans: ["var(--font-sans)"],
                mono: ["var(--font-mono)"],
            },

            fontWeight: {
                thin: "var(--font-thin)",
                extralight: "var(--font-extralight)",
                light: "var(--font-light)",
                normal: "var(--font-normal)",
                medium: "var(--font-medium)",
                semibold: "var(--font-semibold)",
                bold: "var(--font-bold)",
                extrabold: "var(--font-extrabold)",
                black: "var(--font-black)",
            },

            fontSize: {
                xs: "var(--text-xs)",
                sm: "var(--text-sm)",
                base: "var(--text-base)",
                lg: "var(--text-lg)",
                xl: "var(--text-xl)",
                "2xl": "var(--text-2xl)",
                "3xl": "var(--text-3xl)",
                "4xl": "var(--text-4xl)",
                "5xl": "var(--text-5xl)",
                "6xl": "var(--text-6xl)",
                "7xl": "var(--text-7xl, 7.2rem)",
                "8xl": "var(--text-8xl, 9.6rem)",
                "9xl": "var(--text-9xl, 12.8rem)",
            },

            borderRadius: {
                none: "0",
                sm: "var(--radius-sm)",
                DEFAULT: "var(--radius)",
                md: "var(--radius-md)",
                lg: "var(--radius-lg)",
                xl: "var(--radius-xl)",
                full: "var(--radius-full)",
            },

            boxShadow: {
                sm: "var(--shadow-sm)",
                DEFAULT: "var(--shadow)",
                md: "var(--shadow)",
                lg: "var(--shadow-lg)",
                xl: "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.3)",
            },

            spacing: {
                "128": "32rem",
                "144": "36rem",
            },
        },
    },
    plugins: [],
} satisfies Config;
