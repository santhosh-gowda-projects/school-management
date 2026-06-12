/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import DashboardView from "./components/DashboardView";
import AttendanceView from "./components/AttendanceView";
import GradesView from "./components/GradesView";
import PortalView from "./components/PortalView";

import {
  initialClassSchedule,
  initialAssignments,
  initialCourseGrades,
  initialSubjectAttendance,
  initialNotices,
  initialChatMessages,
  initialMeetingProposal,
} from "./initialData";

import { ClassSchedule, Assignment, CourseGrade, SubjectAttendance, Notice, ChatMessage, MeetingProposal } from "./types";

export default function App() {
  // Page tab route index: 0 = Dashboard, 1 = Attendance, 2 = Grades, 3 = Portal
  const [tabIndex, setTabIndex] = useState<number>(() => {
    const saved = localStorage.getItem("academic_pro_tab");
    return saved !== null ? Number(saved) : 0;
  });

  // Current active viewpoint (Role)
  const [currentRole, setCurrentRole] = useState<"student" | "parent">(() => {
    const saved = localStorage.getItem("academic_pro_role");
    return (saved as "student" | "parent") || "student";
  });

  // Data persistence via localStorage
  const [classes, setClasses] = useState<ClassSchedule[]>(() => {
    const saved = localStorage.getItem("academic_pro_classes");
    return saved ? JSON.parse(saved) : initialClassSchedule;
  });

  const [assignments, setAssignments] = useState<Assignment[]>(() => {
    const saved = localStorage.getItem("academic_pro_assignments");
    return saved ? JSON.parse(saved) : initialAssignments;
  });

  const [courseGrades, setCourseGrades] = useState<CourseGrade[]>(() => {
    const saved = localStorage.getItem("academic_pro_course_grades");
    return saved ? JSON.parse(saved) : initialCourseGrades;
  });

  const [subjectAttendances, setSubjectAttendances] = useState<SubjectAttendance[]>(() => {
    const saved = localStorage.getItem("academic_pro_subject_attendance");
    return saved ? JSON.parse(saved) : initialSubjectAttendance;
  });

  const [notices, setNotices] = useState<Notice[]>(() => {
    const saved = localStorage.getItem("academic_pro_notices");
    return saved ? JSON.parse(saved) : initialNotices;
  });

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem("academic_pro_chat_messages");
    return saved ? JSON.parse(saved) : initialChatMessages;
  });

  const [meetingProposal, setMeetingProposal] = useState<MeetingProposal>(() => {
    const saved = localStorage.getItem("academic_pro_meeting_proposal");
    return saved ? JSON.parse(saved) : initialMeetingProposal;
  });

  const [notificationCount, setNotificationCount] = useState(3);

  // Sync state mutations to localStorage
  useEffect(() => {
    localStorage.setItem("academic_pro_tab", String(tabIndex));
  }, [tabIndex]);

  useEffect(() => {
    localStorage.setItem("academic_pro_role", currentRole);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem("academic_pro_classes", JSON.stringify(classes));
  }, [classes]);

  useEffect(() => {
    localStorage.setItem("academic_pro_assignments", JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem("academic_pro_course_grades", JSON.stringify(courseGrades));
  }, [courseGrades]);

  useEffect(() => {
    localStorage.setItem("academic_pro_subject_attendance", JSON.stringify(subjectAttendances));
  }, [subjectAttendances]);

  useEffect(() => {
    localStorage.setItem("academic_pro_notices", JSON.stringify(notices));
  }, [notices]);

  useEffect(() => {
    localStorage.setItem("academic_pro_chat_messages", JSON.stringify(chatMessages));
  }, [chatMessages]);

  useEffect(() => {
    localStorage.setItem("academic_pro_meeting_proposal", JSON.stringify(meetingProposal));
  }, [meetingProposal]);

  // Adjust active tab when switching viewpoint roles
  const handleRoleToggle = () => {
    if (currentRole === "student") {
      setCurrentRole("parent");
      setTabIndex(3); // Go to parent Portal screen
    } else {
      setCurrentRole("student");
      setTabIndex(0); // Go to student Dashboard screen
    }
  };

  // Coordinates switching tabs directly from Bottom Navigation Bar
  const handleTabChange = (idx: number) => {
    setTabIndex(idx);
    if (idx === 3) {
      setCurrentRole("parent");
    } else {
      setCurrentRole("student");
    }
  };

  const handleCompleteAssignment = (id: string) => {
    setAssignments((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleAddAssignment = (newAsg: Omit<Assignment, "id" | "completed">) => {
    const item: Assignment = {
      ...newAsg,
      id: "assign-" + Date.now(),
      completed: false,
    };
    setAssignments((prev) => [item, ...prev]);
    setNotificationCount((c) => c + 1);
  };

  const handleAddCourseGrade = (newGrade: CourseGrade) => {
    setCourseGrades((prev) => [newGrade, ...prev]);
  };

  const handleAddAttendanceLog = (subjectId: string, attended: boolean) => {
    setSubjectAttendances((prev) =>
      prev.map((sub) => {
        if (sub.id === subjectId) {
          const newAttended = attended ? sub.attended + 1 : sub.attended;
          const newTotal = sub.total + 1;
          return {
            ...sub,
            attended: newAttended,
            total: newTotal,
            percentage: Math.round((newAttended / newTotal) * 100),
          };
        }
        return sub;
      })
    );
  };

  const handleSendMessage = (text: string) => {
    const currentHourString = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newMsg: ChatMessage = {
      id: "msg-" + Date.now(),
      sender: "parent",
      text: text,
      time: currentHourString,
    };

    setChatMessages((prev) => [...prev, newMsg]);

    // Simulate smart, delay-replied answer from Mr. Henderson (mathematics instructor)
    setTimeout(() => {
      const answers = [
        "I understand, Mrs. Reynolds. Let me check Lucas' quiz results of algebraic functions and write back shortly.",
        "That works perfectly. I will verify the calendar timeslot.",
        "Hello! Yes, Lucas did excellent work this week. He finished his worksheets among the first.",
        "Thank you for reaching out. Please don't hesitate if you have any curriculum-related questions.",
      ];
      const replyMsg: ChatMessage = {
        id: "msg-reply-" + Date.now(),
        sender: "teacher",
        text: answers[Math.floor(Math.random() * answers.length)],
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setChatMessages((p) => [...p, replyMsg]);
      setNotificationCount((c) => c + 1);
    }, 1500);
  };

  const handleAcceptMeeting = () => {
    setMeetingProposal((prev) => ({ ...prev, status: "accepted" }));
    
    // Add a system notice inform panel
    const systemNotice: Notice = {
      id: "notice-system-" + Date.now(),
      category: "GENERAL",
      title: "Parent-Teacher Meeting Scheduled Successfully",
      description: "Meeting with Mr. Henderson has been successfully scheduled for Thursday, Oct 19 • 15:30. Lucas' student report files have been synchronized.",
      timeLabel: "Just now"
    };
    setNotices((prev) => [systemNotice, ...prev]);
    setNotificationCount((c) => c + 1);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 flex flex-col font-sans">
      {/* Visual global header */}
      <Header
        currentRole={currentRole}
        onRoleToggle={handleRoleToggle}
        notificationCount={notificationCount}
        onClearNotifications={() => setNotificationCount(0)}
      />

      {/* Main Container screen content */}
      <main className="flex-1 w-full max-w-lg lg:max-w-5xl mx-auto px-5 pt-24 pb-28">
        {tabIndex === 0 && (
          <DashboardView
            studentName="Alex"
            classes={classes}
            assignments={assignments}
            onCompleteAssignment={handleCompleteAssignment}
            onAddAssignment={handleAddAssignment}
            onOpenCalendar={() => handleTabChange(1)}
          />
        )}

        {tabIndex === 1 && (
          <AttendanceView
            subjectAttendances={subjectAttendances}
            onAddAttendanceLog={handleAddAttendanceLog}
          />
        )}

        {tabIndex === 2 && (
          <GradesView
            grades={courseGrades}
            onAddCourseGrade={handleAddCourseGrade}
          />
        )}

        {tabIndex === 3 && (
          <PortalView
            notices={notices}
            chatMessages={chatMessages}
            onSendMessage={handleSendMessage}
            meetingProposal={meetingProposal}
            onAcceptMeeting={handleAcceptMeeting}
          />
        )}
      </main>

      {/* Fixed global Elegant Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 w-full z-40 bg-[#0c0c0c]/90 backdrop-blur-md border-t border-slate-900 shadow-[0px_-10px_35px_rgba(0,0,0,0.8)] rounded-t-[1.75rem] h-20 px-4 flex justify-around items-center">
        {/* Tab 0: Dashboard */}
        <button
          onClick={() => handleTabChange(0)}
          className={`flex flex-col items-center justify-center py-1.5 cursor-pointer transition-all duration-200 ${
            tabIndex === 0
              ? "bg-indigo-600 text-white px-5 py-2 rounded-xl shadow-lg font-bold"
              : "text-slate-500 hover:text-slate-300 px-3 font-semibold"
          }`}
          id="nav-dashboard"
        >
          <span className="material-symbols-outlined text-[23px]" style={{ fontVariationSettings: tabIndex === 0 ? "'FILL' 1" : "'FILL' 0" }}>
            dashboard
          </span>
          <span className="text-[10px] tracking-wide mt-0.5">Dashboard</span>
        </button>

        {/* Tab 1: Attendance */}
        <button
          onClick={() => handleTabChange(1)}
          className={`flex flex-col items-center justify-center py-1.5 cursor-pointer transition-all duration-200 ${
            tabIndex === 1
              ? "bg-indigo-600 text-white px-5 py-2 rounded-xl shadow-lg font-bold"
              : "text-slate-500 hover:text-slate-300 px-3 font-semibold"
          }`}
          id="nav-attendance"
        >
          <span className="material-symbols-outlined text-[23px]" style={{ fontVariationSettings: tabIndex === 1 ? "'FILL' 1" : "'FILL' 0" }}>
            calendar_today
          </span>
          <span className="text-[10px] tracking-wide mt-0.5">Attendance</span>
        </button>

        {/* Tab 2: Grades */}
        <button
          onClick={() => handleTabChange(2)}
          className={`flex flex-col items-center justify-center py-1.5 cursor-pointer transition-all duration-200 ${
            tabIndex === 2
              ? "bg-indigo-600 text-white px-5 py-2 rounded-xl shadow-lg font-bold"
              : "text-slate-500 hover:text-slate-300 px-3 font-semibold"
          }`}
          id="nav-grades"
        >
          <span className="material-symbols-outlined text-[23px]" style={{ fontVariationSettings: tabIndex === 2 ? "'FILL' 1" : "'FILL' 0" }}>
            grade
          </span>
          <span className="text-[10px] tracking-wide mt-0.5">Grades</span>
        </button>

        {/* Tab 3: Portal */}
        <button
          onClick={() => handleTabChange(3)}
          className={`flex flex-col items-center justify-center py-1.5 cursor-pointer transition-all duration-200 ${
            tabIndex === 3
              ? "bg-indigo-600 text-white px-5 py-2 rounded-xl shadow-lg font-bold"
              : "text-slate-500 hover:text-slate-300 px-3 font-semibold"
          }`}
          id="nav-portal"
        >
          <span className="material-symbols-outlined text-[23px]" style={{ fontVariationSettings: tabIndex === 3 ? "'FILL' 1" : "'FILL' 0" }}>
            diversity_3
          </span>
          <span className="text-[10px] tracking-wide mt-0.5">Portal</span>
        </button>
      </nav>
    </div>
  );
}

