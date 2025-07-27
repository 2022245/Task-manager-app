
## 1. Task Manager App
This is a simple Task Manager built using React + Vite + Electron.
You can add, edit, delete tasks, and mark them as completed. Tasks are saved locally, so they stay even when you close the app.

## 2. Features
Add, edit, and delete tasks. 

You can filter tasks by status (All, Pending, Completed) and sort tasks by due date or priority.

Each task has a title, description, due date, priority (low, medium, high), and status (pending or completed).

Tasks are saved locally and will not disappear when the app is closed.

Easy-to-use interface.

## 3. How to Run (Development Mode)
Install dependencies:
- npm install
Start the app 
- npm run dev 
This will start Vite (frontend) and Electron together.

## 4. How to Build (Executable File)
Run the build command:
- npm run dist 
Go to the dist/win-unpacked folder and double-click Task Manager.exe to run the app.

## 5. Project Structure
task-manager-app/
main/Electron main process files
src/React (frontend) files
tasks.json/Local storage for tasks
package.json/Project settings and scripts

## 6. Tech Stack by
React (Vite) – Frontend UI
Electron – Desktop application framework
Electron-Store (JSON) – Local storage for tasks

