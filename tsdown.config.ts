import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  // Kept at ES2015 deliberately: the emitted-syntax ceiling is the additive half
  // of the support policy, and must never rise above what tsc's `target: es6`
  // produced before. CI asserts it with es-check.
  target: 'es2015',
  dts: true,
  sourcemap: true,
  clean: true,
  outDir: 'dist',
});
