
import React, { useState } from 'react';
import { LeaveRequest, LeaveStatus } from '../types';

interface AdminRequestsProps {
  requests: LeaveRequest[];
  onUpdate: (id: string, status: LeaveStatus, comment: string) => void;
}

const AdminRequests: React.FC<AdminRequestsProps> = ({ requests, onUpdate }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [comment, setComment] = useState('');

  const pending = requests.filter(r => r.status === LeaveStatus.PENDING);
  const history = requests.filter(r => r.status !== LeaveStatus.PENDING);

  const handleAction = (id: string, status: LeaveStatus) => {
    onUpdate(id, status, comment);
    setSelectedId(null);
    setComment('');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Approvals Dashboard</h1>
        <p className="text-slate-500">Review and manage pending employee requests</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-800">Pending Requests</h3>
          <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full">{pending.length} New</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-xs font-bold text-slate-500 uppercase">
                <th className="px-6 py-4">Employee</th>
                <th className="px-6 py-4">Leave Details</th>
                <th className="px-6 py-4">Remarks</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {pending.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-400 italic">No pending requests to show.</td>
                </tr>
              ) : (
                pending.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800">{req.userName}</div>
                      <div className="text-xs text-slate-500">Applied on {req.createdAt}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-blue-600">{req.type}</div>
                      <div className="text-xs text-slate-500">{req.startDate} to {req.endDate}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 max-w-xs">{req.remarks}</td>
                    <td className="px-6 py-4">
                      {selectedId === req.id ? (
                        <div className="flex flex-col gap-2 min-w-[200px]">
                          <input 
                            type="text" 
                            placeholder="Add comment..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="px-2 py-1 border rounded text-xs outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <div className="flex gap-2">
                            <button onClick={() => handleAction(req.id, LeaveStatus.APPROVED)} className="flex-1 bg-green-500 text-white text-xs font-bold py-1 rounded hover:bg-green-600">Approve</button>
                            <button onClick={() => handleAction(req.id, LeaveStatus.REJECTED)} className="flex-1 bg-red-500 text-white text-xs font-bold py-1 rounded hover:bg-red-600">Reject</button>
                            <button onClick={() => setSelectedId(null)} className="text-slate-400 hover:text-slate-600">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button 
                          onClick={() => setSelectedId(req.id)}
                          className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg font-bold text-xs transition-colors"
                        >
                          Review
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="font-bold text-slate-800">Processed History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-xs font-bold text-slate-500 uppercase">
                <th className="px-6 py-4">Employee</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Comment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {history.map((req) => (
                <tr key={req.id}>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-700">{req.userName}</div>
                    <div className="text-xs text-slate-500">{req.type} • {req.startDate}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase ${
                      req.status === LeaveStatus.APPROVED ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 italic">{req.adminComment || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminRequests;
