
import React from 'react';
import { User, UserRole } from '../types';

interface PayrollProps {
  user: User;
  isAdmin: boolean;
  employees: User[];
}

const Payroll: React.FC<PayrollProps> = ({ user, isAdmin, employees }) => {
  const calculateNet = (u: User) => u.salary.base + u.salary.allowance - u.salary.deductions;

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Payroll & Salary</h1>
          <p className="text-slate-500">View and manage compensation structures</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
          Export Report
        </button>
      </div>

      {!isAdmin ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-8 bg-slate-900 text-white flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold mb-1">E-Payslip</h3>
                  <p className="text-slate-400 text-sm">Period: May 2024</p>
                </div>
                <div className="text-right">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center ml-auto mb-2">
                    <span className="text-white font-bold">D</span>
                  </div>
                  <p className="text-xs text-slate-400">Dayflow HR Systems</p>
                </div>
              </div>
              <div className="p-8 space-y-8">
                <div className="grid grid-cols-2 gap-8 pb-8 border-b border-slate-100">
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Earnings</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Base Salary</span>
                        <span className="font-bold text-slate-800">₹{user.salary.base.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Allowances</span>
                        <span className="font-bold text-green-600">+₹{user.salary.allowance.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Deductions</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Taxes & Insurance</span>
                        <span className="font-bold text-red-600">-₹{user.salary.deductions.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <h4 className="text-xl font-bold text-slate-800">Net Pay</h4>
                  <div className="text-3xl font-black text-blue-600">₹{calculateNet(user).toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-fit">
            <h3 className="font-bold text-slate-800 mb-4">Payment History</h3>
            <div className="space-y-4">
              {['April', 'March', 'February'].map((mon) => (
                <div key={mon} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-100 transition-all">
                  <div>
                    <p className="text-sm font-bold text-slate-800">{mon} 2024</p>
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Paid on 30th</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-700">₹{calculateNet(user).toLocaleString()}</p>
                    <span className="text-[10px] text-green-500 font-bold">SUCCESS</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
             <h3 className="font-bold text-slate-800">Company-wide Payroll Overview</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-xs font-bold text-slate-500 uppercase">
                  <th className="px-6 py-4">Employee</th>
                  <th className="px-6 py-4">Base</th>
                  <th className="px-6 py-4">Allowance</th>
                  <th className="px-6 py-4">Deductions</th>
                  <th className="px-6 py-4">Net Salary</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {employees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={emp.avatar} className="w-8 h-8 rounded-full" alt="" />
                        <div>
                          <div className="font-bold text-slate-800">{emp.fullName}</div>
                          <div className="text-xs text-slate-500">{emp.designation}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-medium">₹{emp.salary.base.toLocaleString()}</td>
                    <td className="px-6 py-4 text-green-600 font-medium">+₹{emp.salary.allowance.toLocaleString()}</td>
                    <td className="px-6 py-4 text-red-600 font-medium">-₹{emp.salary.deductions.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-slate-800 text-base">₹{calculateNet(emp).toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-blue-600 hover:text-blue-800 font-bold text-xs uppercase">Edit Structure</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payroll;
