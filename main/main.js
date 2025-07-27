const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { getTasks, saveTasks } = require('./storage');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // Uncomment if you want devtools in development
  // win.webContents.openDevTools();

  if (process.env.NODE_ENV === 'development') {
    // Load Vite dev server
    win.loadURL('http://localhost:5173').catch(err => {
      console.error('Failed to load Vite server:', err);
    });
  } else {
    // Load production build
    const indexPath = path.join(__dirname, '../dist/index.html');
    console.log('Loading production index from:', indexPath);
    win.loadFile(indexPath).catch(err => {
      console.error('Failed to load index.html:', err);
    });
  }
}

// IPC handlers
ipcMain.handle('tasks:get', () => getTasks());

ipcMain.handle('tasks:add', (event, task) => {
  const tasks = getTasks();
  tasks.push(task);
  saveTasks(tasks);
  return tasks;
});

ipcMain.handle('tasks:delete', (event, taskId) => {
  let tasks = getTasks();
  tasks = tasks.filter(task => task.id !== taskId);
  saveTasks(tasks);
  return tasks;
});

ipcMain.handle('tasks:save', (event, tasks) => {
  saveTasks(tasks);
  return tasks;
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
