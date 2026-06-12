/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ClassSchedule, Assignment, CourseGrade, SubjectAttendance, Notice, ChatMessage, MeetingProposal } from "./types";

export const initialClassSchedule: ClassSchedule[] = [
  {
    id: "class-1",
    time: "09:00",
    period: "AM",
    title: "Advanced Mathematics",
    location: "Room 302 • Dr. Aris",
    instructor: "Dr. Aris",
  },
  {
    id: "class-2",
    time: "11:30",
    period: "AM",
    title: "Political Science",
    location: "Main Auditorium • Prof. Miller",
    instructor: "Prof. Miller",
    isActive: true,
  },
  {
    id: "class-3",
    time: "02:00",
    period: "PM",
    title: "Digital Marketing Lab",
    location: "Tech Wing B • Lab 10",
    instructor: "Prof. Davis",
  }
];

export const initialAssignments: Assignment[] = [
  {
    id: "assign-1",
    title: "Final Thesis Draft",
    dueDateLabel: "DUE IN 2 DAYS",
    dueDateStatus: "urgent",
    description: "Submit the final revision of your thesis proposal including methodology and citations.",
    memberCount: 5,
    completed: false,
  },
  {
    id: "assign-2",
    title: "Data Analysis Quiz",
    dueDateLabel: "DUE NEXT WEEK",
    dueDateStatus: "normal",
    description: "Weekly comprehension quiz covering chapters 5 through 8 of Statistics for Business.",
    memberCount: 2,
    completed: false,
  }
];

export const initialCourseGrades: CourseGrade[] = [
  {
    id: "grade-1",
    code: "CS-402",
    title: "Advanced Data Structures",
    instructor: "Dr. Aris Thorne",
    grade: "A",
    progress: 94,
  },
  {
    id: "grade-2",
    code: "PHY-310",
    title: "Quantum Physics II",
    instructor: "Prof. Elena Miras",
    grade: "B+",
    progress: 88,
  },
  {
    id: "grade-3",
    code: "MAT-205",
    title: "Statistical Analysis",
    instructor: "Dr. Julian Vane",
    grade: "A-",
    progress: 91,
  },
  {
    id: "grade-4",
    code: "PHI-108",
    title: "Ethics in AI",
    instructor: "Prof. Sarah Jenkins",
    grade: "A",
    progress: 97,
  }
];

export const initialSubjectAttendance: SubjectAttendance[] = [
  {
    id: "sub-att-1",
    subject: "Advanced Mathematics",
    icon: "functions",
    attended: 18,
    total: 20,
    percentage: 90,
  },
  {
    id: "sub-att-2",
    subject: "Organic Chemistry",
    icon: "biotech",
    attended: 22,
    total: 22,
    percentage: 100,
  },
  {
    id: "sub-att-3",
    subject: "Modern World History",
    icon: "history_edu",
    attended: 15,
    total: 18,
    percentage: 83,
  }
];

export const initialNotices: Notice[] = [
  {
    id: "notice-1",
    category: "URGENT",
    title: "Annual Sports Day Rescheduled",
    description: "Due to predicted heavy rainfall, the Annual Sports Day has been moved to next Friday, October 27th.",
    timeLabel: "2h ago"
  },
  {
    id: "notice-2",
    category: "GENERAL",
    title: "Science Fair Registration",
    description: "Registration for the 2024 Junior Science Fair is now open. Please submit projects by the end of the week.",
    timeLabel: "Yesterday"
  }
];

export const initialChatMessages: ChatMessage[] = [
  {
    id: "msg-1",
    sender: "teacher",
    text: "Hello Mrs. Reynolds, I've noticed Lucas has been excelling in Algebra this week. Would you like to discuss his progress?",
    time: "09:15 AM",
    isRead: true,
  },
  {
    id: "msg-2",
    sender: "parent",
    text: "That's wonderful news! I would love to. Are you available for a brief meeting this Thursday?",
    time: "09:22 AM",
    isRead: true,
  }
];

export const initialMeetingProposal: MeetingProposal = {
  id: "proposal-1",
  dateTimeLabel: "Thursday, Oct 19 • 15:30",
  teacherName: "Mr. Henderson",
  status: "proposed"
};
