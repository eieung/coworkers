import type { Config } from "tailwindcss";

const createPxValues = (count: number) => {
  return Object.fromEntries(
    Array.from({ length: count + 1 }, (_, i) => [`${i}`, `${i}px`])
  );
};

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderWidth: createPxValues(10),
      fontSize: createPxValues(100),
      lineHeight: createPxValues(100),
      minWidth: createPxValues(200),
      minHeight: createPxValues(200),
      maxWidth: createPxValues(2000),
      maxHeight: createPxValues(2000),
      spacing: createPxValues(2000),
      width: createPxValues(2000),
      height: createPxValues(2000),
      borderRadius: createPxValues(200),
      // 기본 값
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
