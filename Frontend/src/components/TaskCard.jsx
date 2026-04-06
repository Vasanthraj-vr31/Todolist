import React from 'react';
import { Circle, CheckCircle2, GripVertical, Trash2 } from 'lucide-react';

const TaskCard = ({ task, onToggle, onDelete }) => {
  return (
    <div className={`group flex items-center gap-3 py-3 px-4 bg-white border border-neutral-200 rounded-[10px] shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:border-neutral-300 hover:shadow-sm transition-all ${task.completed ? 'bg-neutral-50/50' : ''}`}>
      <div className="cursor-grab opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
        <GripVertical className="w-4 h-4 text-neutral-400" />
      </div>
      
      <button onClick={() => onToggle(task.id)} className="flex-shrink-0 focus:outline-none transition-transform active:scale-95">
        {task.completed ? (
          <CheckCircle2 className="w-[18px] h-[18px] text-neutral-400" />
        ) : (
          <Circle className="w-[18px] h-[18px] text-neutral-300 group-hover:text-neutral-500 transition-colors" />
        )}
      </button>

      <div className="flex-1 min-w-0 flex items-center gap-3">
        <p className={`text-[14px] transition-all ${task.completed ? 'line-through text-neutral-400' : 'text-neutral-800 font-medium'}`}>
          {task.title}
        </p>
        {!task.completed && task.tag && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-[4px] text-[11px] font-medium bg-neutral-100 text-neutral-600 border border-neutral-200/60">
            {task.tag}
          </span>
        )}
      </div>

      <button onClick={() => onDelete(task.id)} className="opacity-0 group-hover:opacity-100 p-1.5 text-neutral-400 hover:text-red-500 transition-all rounded-[6px] hover:bg-red-50 focus:outline-none">
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export default TaskCard;
