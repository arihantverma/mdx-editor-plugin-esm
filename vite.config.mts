/// <reference types="vitest" />
import { readFileSync } from 'node:fs'
import { defineConfig } from "vite";
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import tsconfigPaths from 'vite-tsconfig-paths'

const IN_LADLE = process.env['LADLE']

const ext = {
  cjs: 'cjs',
  es: 'js',
} as const

const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8')) as {
  dependencies: Record<string, string>
  peerDependencies: Record<string, string>
}

const externalPackages = [
  ...Object.keys(packageJson.dependencies),
  ...Object.keys(packageJson.peerDependencies),
  /@lexical\/react\/.*/,
  'react/jsx-runtime', 
  'react/jsx-dev-runtime'
]


export default defineConfig({
  plugins: [
    react(IN_LADLE ? {} : { jsxRuntime: 'classic' } as const),
    dts({
      rollupTypes: true,
      staticImport: true,
      compilerOptions: {
        skipLibCheck: true,
      },
    }),
    tsconfigPaths()
  ],
  build: {
    minify: 'terser',
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: (format, entryName) => {
        return `${entryName}.${ext[format as 'cjs' | 'es']}` 
      },
    },
    rollupOptions: {
      output: {
        exports: 'named',
        preserveModules: true,
        preserveModulesRoot: 'src'
      },
      external: externalPackages,
    },
  },
  test: {
    include: ['src/test/**/*.test.{ts,tsx}'],
    environment: 'jsdom',
    setupFiles: ['src/test/setup.ts'],
  },
});
