import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), legacy({ targets: ['defaults', 'not IE 11'] }), tsconfigPaths(), svgr()],
  define: {
    global: 'globalThis',
  },
  resolve: {
    alias: [
      {
        find: './runtimeConfig',
        replacement: './runtimeConfig.browser', // ensures browser compatible version of AWS JS SDK is used
      },
    ],
  },
});