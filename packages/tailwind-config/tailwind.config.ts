import type { Config } from 'tailwindcss/types/config';

export default {
  darkMode: 'class', // 启用暗模式支持
  theme: {
    extend: {
      colors: {},
      boxShadow: {
        round: '0 0 10px 0 rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
} as Omit<Config, 'content'>;
