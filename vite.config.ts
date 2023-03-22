import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitePluginRewriteAll from 'vite-plugin-rewrite-all';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vitePluginRewriteAll()],
  root: 'src',
});
