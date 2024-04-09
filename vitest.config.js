import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      coverage: {
        reporter: ['json-summary', 'json', 'text'],
        reportOnFailure: true,
        exclude: [
          ...configDefaults.exclude,
          'e2e/*',
          'src/assets/*',
          'src/App.vue',
          'src/index.css',
          'src/main.js',
          'src/router/*',
          '.eslintrc.cjs',
          'vite.config.js',
          'vitest.config.js',
          'postcss.config.js',
          'tailwind.config.js'
        ]
      },
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/*'],
      root: fileURLToPath(new URL('./', import.meta.url))
    }
  })
)
