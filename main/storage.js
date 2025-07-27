const fs = require('fs');
const path = require('path');
const tasksPath = path.join(__dirname, 'tasks.json');

function getTasks() {
  if (!fs.existsSync(tasksPath)) {
    fs.writeFileSync(tasksPath, '[]');
  }
  const data = fs.readFileSync(tasksPath);
  return JSON.parse(data);
}

function saveTasks(tasks) {
  fs.writeFileSync(tasksPath, JSON.stringify(tasks, null, 2));
}

module.exports = { getTasks, saveTasks };
