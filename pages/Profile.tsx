
import React, { useState } from 'react';
import { User, UserRole } from '../types';

interface ProfileProps {
  user: User;
  onUpdate: (updated: User) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleSave = () => {
    onUpdate(editedUser);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Employee Profile</h1>
          <p className="text-slate-500">Manage your personal and professional information</p>
        </div>
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
             <button 
              onClick={() => setIsEditing(false)}
              className="text-slate-600 hover:text-slate-800 px-4 py-2 font-medium"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold shadow-lg shadow-blue-200"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
          <div className="relative group">
            <img src={user.avatar} className="w-32 h-32 rounded-full border-4 border-blue-100 object-cover mb-4" alt="" />
            {isEditing && (
              <div className="absolute inset-0 bg-slate-900/40 rounded-full flex items-center justify-center cursor-pointer">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              </div>
            )}
          </div>
          <h2 className="text-xl font-bold text-slate-800">{user.fullName}</h2>
          <p className="text-blue-600 font-semibold text-sm">{user.designation}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full">{user.department}</span>
            <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full">{user.employeeId}</span>
          </div>
        </div>

        <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100">
          <div className="p-6">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
              Personal Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Full Name</label>
                <input 
                  type="text" 
                  disabled={!isEditing}
                  value={editedUser.fullName}
                  onChange={(e) => setEditedUser({...editedUser, fullName: e.target.value})}
                  className={`w-full p-2 border rounded-lg outline-none transition-all ${isEditing ? 'border-slate-300 focus:ring-2 focus:ring-blue-500' : 'border-transparent bg-transparent text-slate-800 font-semibold'}`}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email</label>
                <p className="p-2 text-slate-800 font-semibold">{user.email}</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Phone</label>
                <input 
                  type="text" 
                  disabled={!isEditing}
                  value={editedUser.phone}
                  onChange={(e) => setEditedUser({...editedUser, phone: e.target.value})}
                  className={`w-full p-2 border rounded-lg outline-none transition-all ${isEditing ? 'border-slate-300 focus:ring-2 focus:ring-blue-500' : 'border-transparent bg-transparent text-slate-800 font-semibold'}`}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Joining Date</label>
                <p className="p-2 text-slate-800 font-semibold">{user.joiningDate}</p>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Address</label>
                <input 
                  type="text" 
                  disabled={!isEditing}
                  value={editedUser.address}
                  onChange={(e) => setEditedUser({...editedUser, address: e.target.value})}
                  className={`w-full p-2 border rounded-lg outline-none transition-all ${isEditing ? 'border-slate-300 focus:ring-2 focus:ring-blue-500' : 'border-transparent bg-transparent text-slate-800 font-semibold'}`}
                />
              </div>
            </div>
          </div>

          <div className="p-6">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              Salary Structure
            </h3>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 grid grid-cols-3 gap-4">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Base Salary</p>
                <p className="text-lg font-bold text-slate-800">₹{user.salary.base.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Allowances</p>
                <p className="text-lg font-bold text-slate-800 text-green-600">+₹{user.salary.allowance.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Deductions</p>
                <p className="text-lg font-bold text-slate-800 text-red-600">-₹{user.salary.deductions.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
