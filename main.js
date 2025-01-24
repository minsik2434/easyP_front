import { app, BrowserWindow, ipcMain, shell } from "electron";
import path from "path";
import { fork } from "child_process";
import isDev from "electron-is-dev";
let mainWindow;
let serverProcess;
const __dirname = path.dirname(new URL(import.meta.url).pathname);
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });
  if (isDev) {
    mainWindow.loadURL("http://localhost:5173");
  } else {
    // const indexPath = path.join(__dirname, "dist", "index.html");
    // mainWindow.loadFile(indexPath);
    mainWindow.loadURL("http://localhost:3000");
  }
  mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  const serverPath = path.join(__dirname, "server.js");
  serverProcess = fork(serverPath, [], { stdio: "inherit" });
  serverProcess.on("message", (message) => {
    if (message === "server-ready") {
      createWindow();
    }
  });
  ipcMain.on("request-auth", () => {
    shell.openExternal("https://www.google.com");
  });
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform != "darwin") {
    app.quit();
  }
});

app.on("will-quit", () => {
  if (serverProcess) {
    console.log("Shutting down server...");
    serverProcess.kill();
  }
});
