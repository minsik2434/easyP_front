import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./", // 상대 경로로 빌드
  build: {
    outDir: "dist", // 빌드 아웃풋 디렉토리
  },
});
