import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // server: {

  //   proxy: {
  //     'v2/': 'https://covid2019-api.herokuapp.com', // Update the backend URL
  //   },
    
  // },
  plugins: [react()],
})
