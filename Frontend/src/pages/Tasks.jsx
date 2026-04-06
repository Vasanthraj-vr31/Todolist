import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import TaskCard from '../components/TaskCard';
import { CheckSquare, Plus } from 'lucide-react';

const Tasks = () => {
  const { tasks, addTask, toggleTask, deleteTask } = useContext(AuthContext);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'completed'

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    addTask(newTaskTitle);
    setNewTaskTitle('');
  };

  const filteredTasks = tasks.filter(task => {
    const isCompleted = task.status === 'completed' || task.completed === true;
    if (filter === 'pending') return !isCompleted;
    if (filter === 'completed') return isCompleted;
    return true; // 'all'
  });

  return (
    <>
      <header className="h-16 px-8 flex items-center border-b border-neutral-200 sticky top-0 bg-white/80 backdrop-blur-md z-10 w-full">
        <div className="flex items-center gap-2 text-neutral-900">
          <CheckSquare className="w-4 h-4 text-neutral-500" />
          <h1 className="font-semibold text-[15px] tracking-tight">My Tasks</h1>
        </div>
      </header>

      <div className="p-8 max-w-3xl mx-auto space-y-6 w-full">
        
        {/* Quick Add Input */}
        <form onSubmit={handleAddTask} className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Plus className="w-4 h-4 text-neutral-400 group-focus-within:text-neutral-600 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-3 bg-white border border-neutral-200 rounded-[10px] shadow-sm focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-400 outline-none transition-all placeholder-neutral-400 text-[14px] text-neutral-900"
            placeholder="What needs to be done?"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
        </form>

        {/* Filters */}
        <div className="flex gap-2">
          <button 
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-[6px] text-[12px] font-medium transition ${filter === 'all' ? 'bg-neutral-900 text-white shadow-sm' : 'bg-transparent text-neutral-500 hover:bg-neutral-100'}`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('pending')}
            className={`px-3 py-1.5 rounded-[6px] text-[12px] font-medium transition flex items-center gap-1.5 ${filter === 'pending' ? 'bg-neutral-900 text-white shadow-sm' : 'bg-transparent text-neutral-500 hover:bg-neutral-100'}`}
          >
            {filter !== 'pending' && <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>}
            Pending
          </button>
          <button 
            onClick={() => setFilter('completed')}
            className={`px-3 py-1.5 rounded-[6px] text-[12px] font-medium transition flex items-center gap-1.5 ${filter === 'completed' ? 'bg-neutral-900 text-white shadow-sm' : 'bg-transparent text-neutral-500 hover:bg-neutral-100'}`}
          >
             {filter !== 'completed' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
            Completed
          </button>
        </div>

        {/* Task List */}
        <div className="space-y-2 mt-4">
          {filteredTasks.length === 0 ? (
             <div className="text-center py-12 bg-white border border-neutral-200 border-dashed rounded-[12px]">
                <p className="text-[14px] text-neutral-500">No tasks found for this filter.</p>
             </div>
          ) : (
            filteredTasks.map(task => (
              <TaskCard key={task._id || task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
            ))
          )}
        </div>

      </div>
    </>
  );
};

export default Tasks;
