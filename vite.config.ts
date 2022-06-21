import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()], //  transpileDependencies: ['@dcloudio/uni-ui'],
  server: {
      cors: true,
      open: true,
      proxy: {
        '/api': {
            target: 'http://127.0.0.1:89',   //代理接口
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, 'api')
        }
      }
  }
}
);


