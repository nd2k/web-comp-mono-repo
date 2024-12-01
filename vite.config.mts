import { defineConfig } from 'vite';
import { resolve } from 'path';

// Configuration principale
export default defineConfig(({ command, mode }) => {
  const isLibrary = mode === 'library';
  const packageDir = isLibrary ? 'packages/web-comp-lib' : 'packages/web-comp-tuto';
  const outDir = isLibrary ? 'dist' : 'build';

  return {
    root: resolve(__dirname, packageDir),
    build: {
      outDir: resolve(__dirname, packageDir , outDir),
      lib: isLibrary
        ? {
            entry: resolve(__dirname, packageDir, 'src/index.ts'),
            name: 'web-comp-lib',
            fileName: (format) => `web-comp-lib.${format}.js`,
          }
        : undefined,
    }
  };
});