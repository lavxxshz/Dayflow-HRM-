
import React, { useState, useEffect, useCallback } from 'react';
import { User, UserRole, AuthState, AttendanceRecord, LeaveRequest, AttendanceStatus, LeaveStatus } from './types';
import { MOCK_ADMIN, MOCK_EMPLOYEE } from './constants';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Attendance from './pages/Attendance';
import Leave from './pages/Leave';
import Payroll from './pages/Payroll';
import AdminEmployees from './pages/AdminEmployees';
import AdminRequests from './pages/AdminRequests';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import { supabase } from './lib/supabase';

const App: React.FC = () => {
  const [auth, setAuth] = useState<AuthState>({ user: null, isAuthenticated: false });
  const [loading, setLoading] = useState(true);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [allEmployees, setAllEmployees] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState('dashboard');

  useEffect(() => {
    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await fetchUserData(session.user.id);
      } else {
        setLoading(false);
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        await fetchUserData(session.user.id);
      } else {
        setAuth({ user: null, isAuthenticated: false });
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserData = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (profile) {
        const userProfile: User = {
          id: profile.id,
          employeeId: profile.employee_id,
          email: profile.email || '',
          fullName: profile.full_name,
          role: profile.role as UserRole,
          avatar: profile.avatar_url,
          department: profile.department,
          designation: profile.designation,
          joiningDate: profile.joining_date,
          phone: profile.phone,
          address: profile.address,
          salary: {
            base: Number(profile.salary_base),
            allowance: Number(profile.salary_allowance),
            deductions: Number(profile.salary_deductions)
          }
        };
        setAuth({ user: userProfile, isAuthenticated: true });
        await fetchData(userProfile);
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async (user: User) => {
    // Fetch Attendance
    const { data: attData } = await supabase
      .from('attendance')
      .select('*')
      .eq('user_id', user.id);
    
    if (attData) {
      const mappedAtt: AttendanceRecord[] = attData.map(a => ({
        id: a.id,
        userId: a.user_id,
        date: a.date,
        checkIn: a.check_in,
        checkOut: a.check_out,
        status: a.status as AttendanceStatus
      }));
      setAttendance(mappedAtt);
    }

    // Fetch Leaves
    const { data: leaveData } = await supabase.from('leave_requests').select('*');
    if (leaveData) {
      const mappedLeaves: LeaveRequest[] = leaveData.map(l => ({
        id: l.id,
        userId: l.user_id,
        userName: l.user_name,
        type: l.type,
        startDate: l.start_date,
        endDate: l.end_date,
        remarks: l.remarks,
        status: l.status as LeaveStatus,
        adminComment: l.admin_comment,
        createdAt: l.created_at
      }));
      setLeaveRequests(mappedLeaves);
    }

    // Fetch Employees if Admin
    if (user.role === UserRole.ADMIN) {
      const { data: profiles } = await supabase.from('profiles').select('*');
      if (profiles) {
        setAllEmployees(profiles.map(p => ({
          id: p.id,
          employeeId: p.employee_id,
          email: p.email,
          fullName: p.full_name,
          role: p.role as UserRole,
          avatar: p.avatar_url,
          department: p.department,
          designation: p.designation,
          joiningDate: p.joining_date,
          phone: p.phone,
          address: p.address,
          salary: { base: Number(p.salary_base), allowance: Number(p.salary_allowance), deductions: Number(p.salary_deductions) }
        })));
      }
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAuth({ user: null, isAuthenticated: false });
    setCurrentPage('login');
  };

  const handleCheckIn = useCallback(async () => {
    if (!auth.user) return;
    const now = new Date();
    const newRecord = {
      user_id: auth.user.id,
      date: now.toISOString().split('T')[0],
      check_in: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: AttendanceStatus.PRESENT
    };
    
    const { data } = await supabase.from('attendance').insert([newRecord]).select();
    if (data) {
      const mapped = {
        id: data[0].id,
        userId: data[0].user_id,
        date: data[0].date,
        checkIn: data[0].check_in,
        checkOut: data[0].check_out,
        status: data[0].status
      };
      setAttendance(prev => [...prev, mapped]);
    }
  }, [auth.user]);

  const handleCheckOut = useCallback(async () => {
    if (!auth.user) return;
    const today = new Date().toISOString().split('T')[0];
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const { data } = await supabase
      .from('attendance')
      .update({ check_out: nowTime })
      .match({ user_id: auth.user.id, date: today })
      .select();

    if (data) {
       setAttendance(prev => prev.map(rec => 
        (rec.userId === auth.user?.id && rec.date === today && !rec.checkOut) 
          ? { ...rec, checkOut: nowTime } 
          : rec
      ));
    }
  }, [auth.user]);

  const handleLeaveSubmit = async (req: LeaveRequest) => {
    const dbReq = {
      user_id: req.userId,
      user_name: req.userName,
      type: req.type,
      start_date: req.startDate,
      end_date: req.endDate,
      remarks: req.remarks,
      status: req.status
    };
    const { data } = await supabase.from('leave_requests').insert([dbReq]).select();
    if (data) {
      const mapped = {
        id: data[0].id,
        userId: data[0].user_id,
        userName: data[0].user_name,
        type: data[0].type,
        startDate: data[0].start_date,
        endDate: data[0].end_date,
        remarks: data[0].remarks,
        status: data[0].status,
        createdAt: data[0].created_at
      };
      setLeaveRequests(prev => [...prev, mapped]);
    }
  };

  const handleLeaveUpdate = async (id: string, status: LeaveStatus, comment: string) => {
    const { data } = await supabase
      .from('leave_requests')
      .update({ status, admin_comment: comment })
      .eq('id', id)
      .select();

    if (data) {
      setLeaveRequests(prev => prev.map(r => r.id === id ? { ...r, status, adminComment: comment } : r));
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600 font-medium">Connecting to Dayflow...</p>
        </div>
      </div>
    );
  }

  if (!auth.isAuthenticated) {
    return <Login onLogin={() => {}} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard user={auth.user!} attendance={attendance} leaveRequests={leaveRequests} employeesCount={allEmployees.length || 2} />;
      case 'profile':
        return <Profile user={auth.user!} onUpdate={(updated) => setAuth({ ...auth, user: updated })} />;
      case 'attendance':
        return <Attendance user={auth.user!} records={attendance.filter(r => r.userId === auth.user?.id)} onCheckIn={handleCheckIn} onCheckOut={handleCheckOut} />;
      case 'leave':
        return <Leave user={auth.user!} requests={leaveRequests.filter(r => r.userId === auth.user?.id)} onSubmit={handleLeaveSubmit} />;
      case 'payroll':
        return <Payroll user={auth.user!} isAdmin={auth.user?.role === UserRole.ADMIN} employees={allEmployees} />;
      case 'admin-employees':
        return <AdminEmployees employees={allEmployees} onUpdate={setAllEmployees} />;
      case 'admin-requests':
        return <AdminRequests requests={leaveRequests} onUpdate={handleLeaveUpdate} />;
      default:
        return <Dashboard user={auth.user!} attendance={attendance} leaveRequests={leaveRequests} employeesCount={allEmployees.length || 2} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden text-slate-900">
      <Sidebar role={auth.user?.role!} currentPage={currentPage} onPageChange={setCurrentPage} onLogout={handleLogout} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar user={auth.user!} />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default App;
