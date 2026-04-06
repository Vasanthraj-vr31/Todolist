import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LayoutDashboard, CheckSquare, Settings, LogOut, CheckCircle2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'My Tasks', icon: CheckSquare, path: '/tasks' },
  ];

  return (
    <aside className="w-64 bg-[#f8f9fa] border-r border-neutral-200 min-h-screen flex flex-col hidden md:flex">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-neutral-200 gap-3">
        <CheckCircle2 className="w-6 h-6 text-neutral-800" />
        <span className="font-semibold text-lg tracking-tight text-neutral-900">TaskFlow</span>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-4 py-8 space-y-1 text-sm font-medium">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-neutral-200/50 text-neutral-900 font-semibold'
                  : 'text-neutral-600 hover:bg-neutral-200/30 hover:text-neutral-900'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-neutral-900' : 'text-neutral-500'}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* User & Settings */}
      <div className="p-4 border-t border-neutral-200 space-y-1">
        <div className="flex items-center gap-3 px-3 py-2 mb-3 bg-white rounded-xl border border-neutral-200 shadow-sm">
          <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-700 font-bold border border-neutral-200/50">
            {user?.username?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-semibold text-neutral-900 truncate">{user?.username || 'User'}</span>
            <span className="text-xs text-neutral-500 truncate">{user?.email || 'user@example.com'}</span>
          </div>
        </div>
        
        <Link 
          to="/settings"
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-neutral-600 hover:bg-neutral-200/50 hover:text-neutral-900 text-sm font-medium"
        >
          <Settings className="w-4 h-4 text-neutral-500" />
          Settings
        </Link>
        <button 
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-neutral-600 hover:bg-red-50 hover:text-red-600 text-sm font-medium"
        >
          <LogOut className="w-4 h-4 text-neutral-500" />
          Log out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
