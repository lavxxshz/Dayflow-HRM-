
import React from 'react';
import { User, UserRole, AttendanceRecord, AttendanceStatus, LeaveRequest, LeaveType, LeaveStatus } from './types';

export const MOCK_ADMIN: User = {
  id: 'u1',
  employeeId: 'EMP-001',
  email: 'admin@dayflow.com',
  fullName: 'Sarita Sharma',
  role: UserRole.ADMIN,
  avatar: 'https://picsum.photos/seed/sarita/200',
  department: 'Human Resources',
  designation: 'Senior HR Manager',
  joiningDate: '2022-01-15',
  phone: '+91 98765 43210',
  address: 'Plot 45, Hitech City, Hyderabad, Telangana',
  salary: { base: 125000, allowance: 15000, deductions: 8500 }
};

export const MOCK_EMPLOYEE: User = {
  id: 'u2',
  employeeId: 'EMP-002',
  email: 'john@dayflow.com',
  fullName: 'Rahul Verma',
  role: UserRole.EMPLOYEE,
  avatar: 'https://picsum.photos/seed/rahul/200',
  department: 'Engineering',
  designation: 'Senior Frontend Engineer',
  joiningDate: '2023-03-10',
  phone: '+91 87654 32109',
  address: 'Apartment 204, Koramangala, Bengaluru, Karnataka',
  salary: { base: 85000, allowance: 12000, deductions: 5000 }
};

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  { id: 'a1', userId: 'u2', date: '2024-05-20', checkIn: '09:00 AM', checkOut: '05:30 PM', status: AttendanceStatus.PRESENT },
  { id: 'a2', userId: 'u2', date: '2024-05-21', checkIn: '08:55 AM', checkOut: '06:00 PM', status: AttendanceStatus.PRESENT },
  { id: 'a3', userId: 'u2', date: '2024-05-22', checkIn: null, checkOut: null, status: AttendanceStatus.ABSENT },
  { id: 'a4', userId: 'u2', date: '2024-05-23', checkIn: '09:15 AM', checkOut: '05:45 PM', status: AttendanceStatus.PRESENT },
];

export const INITIAL_LEAVE_REQUESTS: LeaveRequest[] = [
  {
    id: 'l1',
    userId: 'u2',
    userName: 'Rahul Verma',
    type: LeaveType.PAID,
    startDate: '2024-06-01',
    endDate: '2024-06-05',
    remarks: 'Family vacation to Goa',
    status: LeaveStatus.PENDING,
    createdAt: '2024-05-22'
  },
  {
    id: 'l2',
    userId: 'u2',
    userName: 'Rahul Verma',
    type: LeaveType.SICK,
    startDate: '2024-05-10',
    endDate: '2024-05-11',
    remarks: 'Viral fever',
    status: LeaveStatus.APPROVED,
    adminComment: 'Get well soon!',
    createdAt: '2024-05-09'
  }
];
