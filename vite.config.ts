import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import mkcert from 'vite-plugin-mkcert'
import fs from 'fs';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({

//   server: {
//     https: {
//         key: fs.readFileSync(path.resolve(__dirname, 'key.pem')),
//         cert: fs.readFileSync(path.resolve(__dirname, 'cert.pem')),
//     },
// },

  plugins: [
    react(),
    mkcert() ,
  ],
})
