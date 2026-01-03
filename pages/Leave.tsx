
import React, { useState } from 'react';
import { User, LeaveRequest, LeaveType, LeaveStatus } from '../types';

interface LeaveProps {
  user: User;
  requests: LeaveRequest[];
  onSubmit: (req: LeaveRequest) => void;
}

const Leave: React.FC<LeaveProps> = ({ user, requests, onSubmit }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    type: LeaveType.PAID,
    startDate: '',
    endDate: '',
    remarks: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReq: LeaveRequest = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      userName: user.fullName,
      status: LeaveStatus.PENDING,
      createdAt: new Date().toISOString().split('T')[0],
      ...formData
    };
    onSubmit(newReq);
    setShowForm(false);
    setFormData({ type: LeaveType.PAID, startDate: '', endDate: '', remarks: '' });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Leave Management</h1>
          <p className="text-slate-500">Plan your time off and view request history</p>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow-lg shadow-blue-200"
        >
          New Request
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
          <p className="text-slate-500 text-sm font-medium mb-1">Paid Leave Balance</p>
          <h4 className="text-3xl font-bold text-slate-800">12 Days</h4>
          <div className="mt-4 w-full bg-slate-100 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
          <p className="text-slate-500 text-sm font-medium mb-1">Sick Leaves Taken</p>
          <h4 className="text-3xl font-bold text-slate-800">03 Days</h4>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
          <p className="text-slate-500 text-sm font-medium mb-1">Pending Requests</p>
          <h4 className="text-3xl font-bold text-slate-800">
            {requests.filter(r => r.status === LeaveStatus.PENDING).length}
          </h4>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="font-bold text-slate-800">My Applications</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-xs font-bold text-slate-500 uppercase">
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Duration</th>
                <th className="px-6 py-4">Remarks</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Comment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {[...requests].reverse().map((req) => (
                <tr key={req.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-700">{req.type}</td>
                  <td className="px-6 py-4 text-slate-600">
                    <div className="flex flex-col">
                      <span>{req.startDate}</span>
                      <span className="text-xs text-slate-400">to {req.endDate}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500 italic max-w-xs truncate">{req.remarks}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      req.status === LeaveStatus.APPROVED ? 'bg-green-100 text-green-700' :
                      req.status === LeaveStatus.REJECTED ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 italic text-xs">{req.adminComment || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">Request Time Off</h2>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Leave Type</label>
                <select 
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value as LeaveType})}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={LeaveType.PAID}>Paid Leave</option>
                  <option value={LeaveType.SICK}>Sick Leave</option>
                  <option value={LeaveType.UNPAID}>Unpaid Leave</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
                  <input 
                    type="date" 
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
                  <input 
                    type="date" 
                    required
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Remarks / Reason</label>
                <textarea 
                  rows={3}
                  value={formData.remarks}
                  onChange={(e) => setFormData({...formData, remarks: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Explain briefly..."
                ></textarea>
              </div>
              <div className="pt-4">
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors">
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leave;
