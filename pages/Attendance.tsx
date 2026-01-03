
import React, { useState, useEffect } from 'react';
import { User, AttendanceRecord, AttendanceStatus } from '../types';

interface AttendanceProps {
  user: User;
  records: AttendanceRecord[];
  onCheckIn: () => void;
  onCheckOut: () => void;
}

const Attendance: React.FC<AttendanceProps> = ({ user, records, onCheckIn, onCheckOut }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const today = new Date().toISOString().split('T')[0];
  const todayRecord = records.find(r => r.date === today);
  const isCheckedIn = !!todayRecord?.checkIn && !todayRecord?.checkOut;
  const isCheckedOut = !!todayRecord?.checkOut;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Attendance Tracker</h1>
          <p className="text-slate-500">Log your work hours and track performance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-8 flex flex-col items-center justify-center text-center space-y-6">
          <div className="space-y-1">
            <h2 className="text-5xl font-mono font-bold text-slate-800">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </h2>
            <p className="text-slate-500 font-medium">
              {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="flex gap-4 w-full max-w-sm">
            {!isCheckedIn && !isCheckedOut ? (
              <button 
                onClick={onCheckIn}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95"
              >
                Check In
              </button>
            ) : isCheckedIn ? (
              <button 
                onClick={onCheckOut}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-200 transition-all active:scale-95"
              >
                Check Out
              </button>
            ) : (
              <div className="flex-1 bg-slate-100 text-slate-500 font-bold py-4 rounded-xl border border-slate-200">
                Shift Completed
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-8 w-full border-t border-slate-100 pt-8">
            <div>
              <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Check In</p>
              <p className="text-lg font-bold text-slate-700">{todayRecord?.checkIn || '--:--'}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Check Out</p>
              <p className="text-lg font-bold text-slate-700">{todayRecord?.checkOut || '--:--'}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-bold text-slate-800 mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-xl border border-green-100">
              <p className="text-xs text-green-600 font-bold uppercase tracking-wider">Present Days</p>
              <p className="text-2xl font-bold text-green-700">18</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
              <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">On-time %</p>
              <p className="text-2xl font-bold text-blue-700">96.4%</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
              <p className="text-xs text-orange-600 font-bold uppercase tracking-wider">Avg Hours</p>
              <p className="text-2xl font-bold text-orange-700">8.2 hrs</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="font-bold text-slate-800">Recent History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-xs font-bold text-slate-500 uppercase">
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Check In</th>
                <th className="px-6 py-4">Check Out</th>
                <th className="px-6 py-4">Total Hours</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {[...records].reverse().map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-700">{rec.date}</td>
                  <td className="px-6 py-4 text-slate-600">{rec.checkIn || '-'}</td>
                  <td className="px-6 py-4 text-slate-600">{rec.checkOut || '-'}</td>
                  <td className="px-6 py-4 text-slate-600">8.5h</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      rec.status === AttendanceStatus.PRESENT ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {rec.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
