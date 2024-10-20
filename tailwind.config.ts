import baseConfig from './packages/tailwind-config/tailwind.config';
import type { Config } from 'tailwindcss/types/config';

export default {
  ...baseConfig,
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,css}'],
} as Config;
