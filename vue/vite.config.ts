import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const resolvePath = (str: string) => resolve(__dirname, str);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: { isCustomElement: (tag) => tag.includes('-') },
      },
    }),
  ],
  build: {
    lib: {
      entry: resolvePath('src/lib/index.ts'),
      formats: ['cjs', 'es'],
      fileName: (format) => ({
        cjs: 'index.cjs',
        es: 'index.mjs',
      }[format]),
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
