
import React from 'react';
import { User } from '../types';

interface NavbarProps {
  user: User;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 shrink-0">
      <div className="flex items-center gap-4">
        <button className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
        <h2 className="text-lg font-semibold text-slate-800 hidden sm:block">Welcome back, {user.fullName.split(' ')[0]}</h2>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full relative">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-800">{user.fullName}</p>
            <p className="text-xs text-slate-500">{user.designation}</p>
          </div>
          <img 
            src={user.avatar} 
            alt={user.fullName} 
            className="w-10 h-10 rounded-full border-2 border-blue-100 object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
