import React from 'react';
import { Calendar } from 'lucide-react';

const Upcoming = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <header className="flex items-center gap-2 text-gray-800 mb-8 border-b border-gray-100 pb-4">
        <Calendar className="w-6 h-6 text-blue-600" />
        <h1 className="text-2xl font-bold tracking-tight">Upcoming</h1>
      </header>
      
      <div className="bg-gray-50 border border-dashed border-gray-300 rounded-2xl p-12 text-center text-gray-500">
        <p>Plan ahead.</p>
        <p className="text-sm mt-2">Your calendar integrations and scheduled tasks will show up here.</p>
      </div>
    </div>
  );
};

export default Upcoming;
