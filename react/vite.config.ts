import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import typescript from '@rollup/plugin-typescript';

const resolvePath = (str: string) => resolve(__dirname, str);

function wrapper() {
  return {
    name: 'wrapper',
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'wrapper.mjs',
        source: `import module from './index.js';\n\nexport default module;`,
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), wrapper()],
  build: {
    lib: {
      entry: resolvePath('src/lib/index.ts'),
      formats: ['cjs'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'reactJsxRuntime',
        },
      },
      plugins: [
        typescript({
          target: 'es2020',
          rootDir: resolvePath('src/lib'),
          outDir: resolvePath('dist'),
          declaration: true,
        }),
      ],
    },
  },
});
