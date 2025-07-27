import React from 'react';

const TaskList = ({ tasks, onDelete }) => {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id} className="task-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Due: {task.dueDate}</p>
            <p>Priority: {task.priority}</p>
            <p>Status: {task.status}</p>
            <button onClick={() => onDelete(task.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
