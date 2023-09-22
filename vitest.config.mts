import { defineConfig } from 'vitest/config';

export default defineConfig( {
  test: {
    include: ['src/**/*.test.ts'],
    name: 'node',
    environment: 'node',
  }
});