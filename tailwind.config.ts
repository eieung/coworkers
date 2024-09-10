import type { Config } from 'tailwindcss';
import { PluginAPI } from 'tailwindcss/types/config';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './constants/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        sm: { max: '767px' },
        md: { min: '768px', max: '1199px' },
        lg: { min: '1200px' },
      },
      boxShadow: {
        floating: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },

      // 기본 값
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        /* Brand gradient */
        'brand-gradient':
          'linear-gradient(to right, var(--brand-primary), var(--brand-tertiary))',
      },
      colors: {
        /* Base colors */
        black: 'var(--black)',
        white: 'var(--white)',

        /* Brand colors */
        'brand-primary': 'var(--brand-primary)',
        'brand-secondary': 'var(--brand-secondary)',
        'brand-tertiary': 'var(--brand-tertiary)',

        /* Point colors */
        'point-purple': 'var(--point-purple)',
        'point-blue': 'var(--point-blue)',
        'point-cyan': 'var(--point-cyan)',
        'point-pink': 'var(--point-pink)',
        'point-rose': 'var(--point-rose)',
        'point-orange': 'var(--point-orange)',
        'point-yellow': 'var(--point-yellow)',

        /* Background colors */
        'bg-primary': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'bg-tertiary': 'var(--bg-tertiary)',
        'bg-inverse': 'var(--bg-inverse)',

        /* Interaction colors */
        'it-inactive': 'var(--it-inactive)',
        'it-hover': 'var(--it-hover)',
        'it-pressed': 'var(--it-pressed)',
        'it-focus': 'var(--it-focus)',

        /* Border color */
        'bd-primary': 'var(--bd-primary)',

        /* Text colors */
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-tertiary': 'var(--text-tertiary)',
        'text-default': 'var(--text-default)',
        'text-inverse': 'var(--text-inverse)',
        'text-disabled': 'var(--text-disabled)',

        /* Status color */
        'status-danger': 'var(--status-danger)',

        /* Icon colors */
        'icon-primary': 'var(--icon-primary)',
        'icon-secondary': 'var(--icon-secondary)',
        'icon-tertiary': 'var(--icon-tertiary)',
      },
    },
  },
  plugins: [
    /* scrollbar custom */
    function ({ addVariant }: PluginAPI) {
      addVariant('scrollbar', '&::-webkit-scrollbar');
      addVariant('scrollbar-thumb', '&::-webkit-scrollbar-thumb');
      addVariant('scrollbar-track', '&::-webkit-scrollbar-track');
    },
  ],
};
export default config;
