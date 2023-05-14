import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import EnvironmentPlugin from 'vite-plugin-environment'

// eslint-disable-next-line no-undef
const isDev = process.env['DFX_NETWORK'] !== 'ic'
// setting host to avoid errors when calling backend in the front end ;
const host = isDev ? 'http://127.0.0.1:8000' : 'https://ic0.app'

// https://vitejs.dev/config/
export default defineConfig({
  // to proxy were the dfx canisters run to be able to do calls to the backend while on dev and enable hot relaod
  server: {
    proxy: {
      '/api': {
        target: 'http://0.0.0.0:8000',
        changeOrigin: true
      }
    }
  },

  plugins: [
    vue(),
    // This is required for now because the code generated by dfx relies on process.env being set
    EnvironmentPlugin('all', { prefix: 'CANISTER_' }),
    EnvironmentPlugin('all', { prefix: 'DFX_' }),
    EnvironmentPlugin({ BACKEND_CANISTER_ID: '' })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src/vue3_ic_template_ts_frontend', import.meta.url)),
      '@declarations': fileURLToPath(new URL('./src/declarations/', import.meta.url))
    }
  },
  define: {
    //added to fix the possible error of grobal not defined when runing on development specialy running hot reload on vue vite
    global: 'window',
    // Here we can define global constants
    // This is required for now because the code generated by dfx relies on process.env being set
    // ...canisterDefinitions,
    'process.env.NODE_ENV': JSON.stringify(isDev ? 'development' : 'production'),
    //nedded mostly for development to be able to call the backend
    'process.env.VITE_HOST': JSON.stringify(host)
  }
})
