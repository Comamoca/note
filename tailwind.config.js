/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";
import daisyui from "daisyui";

export default {
  content: ["./app/**/*.{ts,tsx}", "./dist./**/*.html"],
  theme: {
    extend: {},
  },
  plugins: [typography(), daisyui],
};
