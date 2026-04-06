import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { CheckCircle2, Clock, CheckSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user, tasks } = useContext(AuthContext);

  const pendingTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <>
      {/* Header */}
      <header className="h-16 px-8 flex items-center border-b border-neutral-200 sticky top-0 bg-white/80 backdrop-blur-md z-10 w-full">
        <div className="flex items-center gap-2 text-neutral-900">
          <CheckSquare className="w-5 h-5 text-neutral-500" />
          <h1 className="font-semibold text-[15px] tracking-tight">Workspace Overview</h1>
        </div>
      </header>

      <div className="p-8 max-w-4xl mx-auto space-y-10 w-full">
        {/* Greeting Section */}
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 mb-1">
            Good {new Date().getHours() < 12 ? 'morning' : 'afternoon'}, {user?.username?.split(' ')[0] || 'User'}
          </h2>
          <p className="text-neutral-500 text-[14px]">Here's a summary of your workspace.</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white border border-neutral-200 rounded-[12px] p-6 shadow-sm flex flex-col space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-neutral-100 text-neutral-600 rounded-[8px] flex items-center justify-center">
                <CheckSquare className="w-4 h-4" />
              </div>
              <p className="text-[13px] font-medium text-neutral-600">Total Tasks</p>
            </div>
            <h3 className="text-3xl font-semibold text-neutral-900">{tasks.length}</h3>
          </div>

          <div className="bg-white border border-neutral-200 rounded-[12px] p-6 shadow-sm flex flex-col space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-amber-50 text-amber-600 border border-amber-100 rounded-[8px] flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <p className="text-[13px] font-medium text-neutral-600">Pending</p>
            </div>
            <h3 className="text-3xl font-semibold text-neutral-900">{pendingTasks.length}</h3>
          </div>

          <div className="bg-white border border-neutral-200 rounded-[12px] p-6 shadow-sm flex flex-col space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-[8px] flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <p className="text-[13px] font-medium text-neutral-600">Completed</p>
            </div>
            <h3 className="text-3xl font-semibold text-neutral-900">{completedTasks.length}</h3>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex pt-4">
           <Link to="/tasks" className="bg-white border border-neutral-200 text-neutral-700 px-6 py-2.5 rounded-[8px] hover:bg-neutral-50 hover:text-neutral-900 transition shadow-[0_2px_4px_rgba(0,0,0,0.02)] text-[13px] font-medium">
             Open My Tasks
           </Link>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
