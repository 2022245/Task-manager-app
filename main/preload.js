const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getTasks: () => ipcRenderer.invoke('tasks:get'),
  addTask: (task) => ipcRenderer.invoke('tasks:add', task),
  deleteTask: (id) => ipcRenderer.invoke('tasks:delete', id),
  saveTasks: (tasks) => ipcRenderer.invoke('tasks:save', tasks),

});

window.addEventListener('DOMContentLoaded', () => {
  console.log('Preload script loaded');
});
