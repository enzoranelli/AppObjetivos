import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss({
      config: './tailwind.config.js'
    }),
    svgr({
      svgrOptions: {
        icon: true,
      },
    })
  ],
})
