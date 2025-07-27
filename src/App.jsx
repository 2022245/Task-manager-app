import { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [newPriority, setNewPriority] = useState('Low');
  const [newStatus, setNewStatus] = useState('Pending');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editFields, setEditFields] = useState({});
  const [filterStatus, setFilterStatus] = useState('all'); // NEW
  const [sortOption, setSortOption] = useState('none'); // NEW

  // Load tasks from Electron store
  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.getTasks().then((storedTasks) => {
        if (storedTasks) setTasks(storedTasks);
      });
    }
  }, []);

  // Save tasks to storage
  const saveAllTasks = (updatedTasks) => {
    setTasks(updatedTasks);
    if (window.electronAPI?.saveTasks) {
      window.electronAPI.saveTasks(updatedTasks);
    }
  };

  // Add new task
  const addTask = () => {
    if (!newTask.trim()) return;

    const task = {
      id: Date.now(),
      text: newTask,
      description: newDescription,
      dueDate: newDueDate,
      priority: newPriority,
      status: newStatus,
      completed: false,
    };

    const updatedTasks = [...tasks, task];
    saveAllTasks(updatedTasks);

    // Clear input fields
    setNewTask('');
    setNewDescription('');
    setNewDueDate('');
    setNewPriority('Low');
    setNewStatus('Pending');
  };

  // Delete a task
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    saveAllTasks(updatedTasks);
  };

  // Toggle completion with strikethrough
  const toggleCompleted = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveAllTasks(updatedTasks);
  };

  // Start editing a task
  const startEditing = (task) => {
    setEditTaskId(task.id);
    setEditFields({
      text: task.text,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority,
      status: task.status,
    });
  };

  // Save task edits
  const saveEdit = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, ...editFields } : task
    );
    saveAllTasks(updatedTasks);
    setEditTaskId(null);
  };

  // Filtering and sorting logic
  const priorityValue = (priority) => {
    if (priority === 'Low') return 1;
    if (priority === 'Medium') return 2;
    return 3;
  };

  const filteredTasks = tasks.filter((task) => {
    if (filterStatus === 'pending') return !task.completed;
    if (filterStatus === 'completed') return task.completed;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortOption === 'dueDate') return new Date(a.dueDate) - new Date(b.dueDate);
    if (sortOption === 'priority') return priorityValue(a.priority) - priorityValue(b.priority);
    return 0;
  });

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Task Manager</h1>

      {/* Input fields */}
      <div style={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        <input
          type="text"
          placeholder="Task Title"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          style={{ flex: '1', minWidth: '150px', padding: '5px' }}
        />
        <input
          type="text"
          placeholder="Description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          style={{ flex: '1', minWidth: '200px', padding: '5px' }}
        />
        <input
          type="date"
          value={newDueDate}
          onChange={(e) => setNewDueDate(e.target.value)}
          style={{ padding: '5px' }}
        />
        <select
          value={newPriority}
          onChange={(e) => setNewPriority(e.target.value)}
          style={{ padding: '5px' }}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <select
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          style={{ padding: '5px' }}
        >
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <button onClick={addTask} style={{ padding: '5px 10px' }}>
          Add Task
        </button>
      </div>

      {/* Filter and Sort */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">All Tasks</option>
          <option value="pending">Pending Tasks</option>
          <option value="completed">Completed Tasks</option>
        </select>
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="none">No Sorting</option>
          <option value="dueDate">Sort by Due Date</option>
          <option value="priority">Sort by Priority</option>
        </select>
      </div>

      {/* Task list */}
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {sortedTasks.map((task) => (
          <li
            key={task.id}
            style={{
              marginBottom: '20px',
              borderBottom: '1px solid #ccc',
              paddingBottom: '10px',
            }}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleCompleted(task.id)}
              style={{ marginRight: '10px' }}
            />

            {editTaskId === task.id ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <input
                  type="text"
                  value={editFields.text}
                  onChange={(e) =>
                    setEditFields({ ...editFields, text: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={editFields.description}
                  onChange={(e) =>
                    setEditFields({
                      ...editFields,
                      description: e.target.value,
                    })
                  }
                />
                <input
                  type="date"
                  value={editFields.dueDate}
                  onChange={(e) =>
                    setEditFields({ ...editFields, dueDate: e.target.value })
                  }
                />
                <select
                  value={editFields.priority}
                  onChange={(e) =>
                    setEditFields({ ...editFields, priority: e.target.value })
                  }
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
                <select
                  value={editFields.status}
                  onChange={(e) =>
                    setEditFields({ ...editFields, status: e.target.value })
                  }
                >
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
                <button onClick={() => saveEdit(task.id)} style={{ marginTop: '5px' }}>
                  Save
                </button>
              </div>
            ) : (
              <div>
                <div
                  style={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                    fontWeight: 'bold',
                  }}
                >
                  {task.text}
                </div>
                {task.description && (
                  <div
                    style={{
                      textDecoration: task.completed ? 'line-through' : 'none',
                      color: '#555',
                      margin: '5px 0',
                    }}
                  >
                    {task.description}
                  </div>
                )}
                <div>
                  <strong>Due:</strong> {task.dueDate || 'No date set'}
                </div>
                <div>
                  <strong>Priority:</strong> {task.priority} |{' '}
                  <strong>Status:</strong> {task.status}
                </div>
                <button
                  onClick={() => startEditing(task)}
                  style={{
                    marginTop: '5px',
                    marginRight: '10px',
                    color: 'blue',
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  style={{
                    marginTop: '5px',
                    marginRight: '10px',
                    color: 'red',
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
