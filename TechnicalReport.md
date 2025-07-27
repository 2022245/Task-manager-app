# Technical Document – Task Manager App

## 1. Technology and Framework Choice

I decided to use **React** (with Vite) and **Electron** to build the Task Manager app.  
- **React** was chosen because it makes building the user interface simple and easy to manage with components.  
- **Vite** is a fast build tool that works perfectly with React.  
- **Electron** lets us turn the web app into a desktop application that works on Windows.

For storing tasks, I used a **JSON file** through `electron-store`. This is simple, fast, and good for small desktop apps that do not need a full database.

## 2. Key Features

The app includes all the features requested in the requirements:
- **Task Creation, Editing, and Deleting**  
  Users can add tasks with a title, description, due date, priority (low, medium, high), and status (pending or completed).
- **Filtering & Sorting**  
  The app allows filtering tasks by status (pending or completed) and sorting tasks by due date or priority level (low, medium, high).
- **Persistent Storage**  
  Tasks are saved in a local `tasks.json` file so they stay after restarting the app.
- **Marking Tasks as Done**  
  Tasks can be marked as completed with a checkbox (shows strikethrough).
- **Basic UI**  
  The layout is clean and simple. We kept spacing clear between input fields and tasks.
  
## 3. Technical Decisions

- I used **electron-store** instead of a database like SQLite because it is easier to set up and good for a lightweight app.
- I used **React Hooks (useState, useEffect)** to manage the state of tasks.
- Task data is updated both in the UI and the `tasks.json` file to ensure changes persist.

## 4. Known Issues or Limitations

- No dark/light mode toggle is implemented.  
- There are no notifications or reminders for due tasks (bonus feature).

## 5. How to Run the App

1. Install dependencies:
   - npm install
2. Run the developer version:
   - npm run dev
3. To build the production files
   - npm run build 
4. To build the desktop app:
   - npm run dist 
5. The executable will appear in the dist/win-unpacked folder.


