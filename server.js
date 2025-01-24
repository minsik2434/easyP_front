import express from "express";
import path from "path";
const app = express();
const PORT = 3000;
const staticPath = path.join(
  path.dirname(new URL(import.meta.url).pathname),
  "dist"
);
app.use(express.static(staticPath));
app.get("*", (req, res) => {
  res.sendFile(path.join(staticPath, "index.html"));
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  if (process.send) {
    process.send("server-ready"); // 서버 준비 완료 후 신호 전송
  }
});
