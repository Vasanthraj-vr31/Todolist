import React, { useContext, useState } from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Settings = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    Department: user?.Department || '',
    year: user?.year || '',
    Age: user?.Age || ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUser(formData);
      setMessage("Profile updated successfully!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6 w-full">
      <header className="flex items-center gap-2 text-neutral-900 mb-8 border-b border-neutral-200 pb-4">
        <SettingsIcon className="w-5 h-5 text-neutral-500" />
        <h1 className="text-[15px] font-semibold tracking-tight">Account Settings</h1>
      </header>
      
      <div className="bg-white border border-neutral-200 rounded-[12px] p-8 shadow-sm">
        <h2 className="text-[14px] font-medium mb-6 text-neutral-900 border-b border-neutral-100 pb-2">Profile Details</h2>
        
        {message && <div className="mb-6 p-3 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-[8px] text-[13px]">{message}</div>}
        
        <form onSubmit={handleUpdate} className="space-y-5">
          <div className="grid grid-cols-2 gap-6">
             <div className="flex flex-col space-y-1.5">
               <label className="text-[13px] font-medium text-neutral-700">Username</label>
               <input type="text" name="username" value={formData.username} onChange={handleChange} className="input-field" required />
             </div>
             <div className="flex flex-col space-y-1.5">
               <label className="text-[13px] font-medium text-neutral-700">Department</label>
               <input type="text" name="Department" value={formData.Department} onChange={handleChange} className="input-field" required />
             </div>
             <div className="flex flex-col space-y-1.5">
               <label className="text-[13px] font-medium text-neutral-700">Year</label>
               <input type="number" name="year" value={formData.year} onChange={handleChange} className="input-field" required />
             </div>
             <div className="flex flex-col space-y-1.5">
               <label className="text-[13px] font-medium text-neutral-700">Age</label>
               <input type="number" name="Age" value={formData.Age} onChange={handleChange} className="input-field" required />
             </div>
          </div>
          
          <div className="pt-6 mt-8 flex">
            <button type="submit" className="btn-primary w-auto px-6">
              Save updates
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
