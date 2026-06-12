/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ClassSchedule {
  id: string;
  time: string;
  period: "AM" | "PM";
  title: string;
  location: string;
  instructor: string;
  isActive?: boolean;
}

export interface Assignment {
  id: string;
  title: string;
  dueDateLabel: string; // e.g., "DUE IN 2 DAYS" or "DUE NEXT WEEK"
  dueDateStatus: "urgent" | "normal";
  description: string;
  memberCount: number;
  completed: boolean;
}

export interface CourseGrade {
  id: string;
  code: string;
  title: string;
  instructor: string;
  grade: string;
  progress: number; // e.g. 94
}

export interface AttendanceDay {
  day: number;
  type: "present" | "late" | "absent" | "none";
  isCurrent?: boolean;
}

export interface SubjectAttendance {
  id: string;
  subject: string;
  icon: string; // e.g. "functions", "biotech", "history_edu"
  attended: number;
  total: number;
  percentage: number;
}

export interface Notice {
  id: string;
  category: "URGENT" | "GENERAL";
  title: string;
  description: string;
  timeLabel: string; // e.g. "2h ago", "Yesterday"
}

export interface ChatMessage {
  id: string;
  sender: "parent" | "teacher";
  text: string;
  time: string;
  isRead?: boolean;
}

export interface MeetingProposal {
  id: string;
  dateTimeLabel: string; // e.g. "Thursday, Oct 19 • 15:30"
  teacherName: string;
  status: "proposed" | "accepted" | "declined";
}
