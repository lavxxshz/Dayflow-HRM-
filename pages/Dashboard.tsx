
import React, { useState, useEffect } from 'react';
import { User, UserRole, AttendanceRecord, LeaveRequest, AttendanceStatus, LeaveStatus } from '../types';
import { getSmartHRSummary } from '../services/geminiService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

interface DashboardProps {
  user: User;
  attendance: AttendanceRecord[];
  leaveRequests: LeaveRequest[];
  employeesCount: number;
}

const Dashboard: React.FC<DashboardProps> = ({ user, attendance, leaveRequests, employeesCount }) => {
  const [aiInsight, setAiInsight] = useState('Loading insights...');
  const isAdmin = user.role === UserRole.ADMIN;

  useEffect(() => {
    const fetchInsight = async () => {
      const summaryData = isAdmin ? { employeesCount, pendingLeaves: leaveRequests.filter(l => l.status === LeaveStatus.PENDING).length } : { attendance: attendance.filter(a => a.userId === user.id).length };
      const insight = await getSmartHRSummary(user.fullName, user.role, summaryData);
      setAiInsight(insight);
    };
    fetchInsight();
  }, [user, isAdmin, employeesCount, leaveRequests.length, attendance.length]);

  const stats = [
    { label: 'Attendance (This Mo)', value: attendance.filter(a => a.userId === user.id && a.status === AttendanceStatus.PRESENT).length, color: 'bg-green-500' },
    { label: 'Pending Leave', value: leaveRequests.filter(l => l.userId === user.id && l.status === LeaveStatus.PENDING).length, color: 'bg-amber-500' },
    { label: 'Total Members', value: employeesCount, color: 'bg-blue-500', hideOnEmployee: true },
  ].filter(s => !s.hideOnEmployee || isAdmin);

  const chartData = [
    { name: 'Mon', count: 4 },
    { name: 'Tue', count: 7 },
    { name: 'Wed', count: 5 },
    { name: 'Thu', count: 8 },
    { name: 'Fri', count: 6 },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Operational Dashboard</h1>
          <p className="text-slate-500">Overview of your activity and company insights</p>
        </div>
        <div className="px-4 py-2 bg-white rounded-lg border border-slate-200 text-sm font-medium text-slate-600 flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          System Status: Operational
        </div>
      </header>

      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-1">AI HR Assistant</h3>
            <p className="text-blue-50 leading-relaxed max-w-2xl italic">"{aiInsight}"</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-slate-500 text-sm font-medium mb-1">{stat.label}</p>
            <div className="flex items-end justify-between">
              <h4 className="text-3xl font-bold text-slate-800">{stat.value}</h4>
              <div className={`w-8 h-8 rounded-lg ${stat.color} flex items-center justify-center text-white`}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/></svg>
              </div>
            </div>
          </div>
        ))}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm font-medium mb-1">Date</p>
            <p className="text-xl font-bold text-slate-800">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
          </div>
          <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800">Weekly Performance Insight</h3>
            <button className="text-blue-600 text-sm font-medium hover:underline">View Details</button>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#3b82f6' : '#6366f1'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <h3 className="font-bold text-slate-800 mb-4">Upcoming Schedule</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex flex-col items-center justify-center shrink-0">
                  <span className="text-[10px] uppercase font-bold text-blue-400">May</span>
                  <span className="text-lg font-bold text-blue-600 leading-none">{24 + item}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">Product Review Meeting</p>
                  <p className="text-xs text-slate-500">10:00 AM - 11:30 AM</p>
                </div>
              </div>
            ))}
            <button className="w-full py-2 mt-4 text-sm font-medium text-blue-600 border border-blue-100 rounded-lg hover:bg-blue-50 transition-colors">
              Add New Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
