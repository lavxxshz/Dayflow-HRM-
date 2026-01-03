
export enum UserRole {
  ADMIN = 'HR/Admin',
  EMPLOYEE = 'Employee'
}

export enum AttendanceStatus {
  PRESENT = 'Present',
  ABSENT = 'Absent',
  HALF_DAY = 'Half-day',
  LEAVE = 'Leave'
}

export enum LeaveStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected'
}

export enum LeaveType {
  PAID = 'Paid',
  SICK = 'Sick',
  UNPAID = 'Unpaid'
}

export interface User {
  id: string;
  employeeId: string;
  email: string;
  fullName: string;
  role: UserRole;
  avatar: string;
  department: string;
  designation: string;
  joiningDate: string;
  phone: string;
  address: string;
  salary: {
    base: number;
    allowance: number;
    deductions: number;
  };
}

export interface AttendanceRecord {
  id: string;
  userId: string;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  status: AttendanceStatus;
}

export interface LeaveRequest {
  id: string;
  userId: string;
  userName: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  remarks: string;
  status: LeaveStatus;
  adminComment?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
