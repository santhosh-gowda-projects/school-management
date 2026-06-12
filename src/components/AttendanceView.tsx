/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SubjectAttendance } from "../types";

interface AttendanceViewProps {
  subjectAttendances: SubjectAttendance[];
  onAddAttendanceLog?: (subjectId: string, attended: boolean) => void;
}

export default function AttendanceView({
  subjectAttendances,
  onAddAttendanceLog,
}: AttendanceViewProps) {
  const [selectedDay, setSelectedDay] = useState<number | null>(9);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(9); // October is 9 (0-indexed represents October here)

  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  const handlePrevMonth = () => {
    setCurrentMonthIndex((prev) => (prev === 0 ? 11 : prev - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthIndex((prev) => (prev === 11 ? 0 : prev + 1));
  };

  // Specific day status mapping for October 2023
  const getDayDotStyle = (day: number) => {
    if ([1, 2, 3, 6, 8, 9, 13, 14, 15, 17, 20, 21, 22, 23, 24].includes(day)) {
      return "bg-indigo-400"; // Indigo dot: Present
    }
    if ([7, 16].includes(day)) {
      return "bg-amber-400"; // Amber: Late
    }
    if ([10].includes(day)) {
      return "bg-rose-450 text bg-rose-500"; // Purple/Red: Absent
    }
    return null;
  };

  const getDayDotLabel = (day: number) => {
    if ([1, 2, 3, 6, 8, 9, 13, 14, 15, 17, 20, 21, 22, 23, 24].includes(day)) return "Present";
    if ([7, 16].includes(day)) return "Late";
    if ([10].includes(day)) return "Absent";
    return "No Class";
  };

  const [activeSubject, setActiveSubject] = useState<SubjectAttendance | null>(null);

  return (
    <div className="space-y-6">
      {/* Title & Stats */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-sans tracking-tight">
            Attendance Overview
          </h2>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Realtime metrics and status logs representing Lucas' academic course participation.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bento-card bg-[#0c0c0c] p-5 rounded-[2rem] shadow-2xl border border-slate-800">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Present Rate</p>
            <p className="text-3xl font-extrabold font-sans text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 tracking-tight">94.2%</p>
          </div>
          <div className="bento-card bg-[#0c0c0c] p-5 rounded-[2rem] shadow-2xl border border-slate-800">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Late Count</p>
            <p className="text-3xl font-extrabold font-sans text-white tracking-tight">
              3 <span className="text-xs font-normal text-slate-500 uppercase font-mono">days</span>
            </p>
          </div>
        </div>
      </section>

      {/* Calendar Component wrapper */}
      <section className="bg-[#0c0c0c] border border-slate-800 rounded-[2rem] overflow-hidden shadow-2xl">
        {/* Calendar Controller bar */}
        <div className="p-5 flex items-center justify-between border-b border-slate-900 bg-slate-900/40">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
            {months[currentMonthIndex]} 2023
          </h3>
          <div className="flex gap-2">
            <button
              onClick={handlePrevMonth}
              className="p-1.5 hover:bg-slate-800 transition-colors rounded-xl cursor-pointer h-8 w-8 flex items-center justify-center border border-slate-800 text-slate-400"
              aria-label="Previous month"
            >
              <span className="material-symbols-outlined text-sm font-bold">
                chevron_left
              </span>
            </button>
            <button
              onClick={handleNextMonth}
              className="p-1.5 hover:bg-slate-800 transition-colors rounded-xl cursor-pointer h-8 w-8 flex items-center justify-center border border-slate-800 text-slate-400"
              aria-label="Next month"
            >
              <span className="material-symbols-outlined text-sm font-bold">
                chevron_right
              </span>
            </button>
          </div>
        </div>

        {/* Days of Week names */}
        <div className="grid grid-cols-7 text-center py-2.5 bg-slate-950/40 border-b border-slate-900 text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">
          <div>S</div>
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
        </div>

        {/* Calendar Grid Numbers */}
        <div className="grid grid-cols-7 p-4 gap-y-3 text-center text-xs font-sans bg-slate-950/15">
          {/* Row 1 (October starts on Sunday for simulation but let's draw exactly October 2023 values) */}
          <div className="h-10 flex items-center justify-center text-slate-700 font-medium select-none">28</div>
          <div className="h-10 flex items-center justify-center text-slate-700 font-medium select-none">29</div>
          <div className="h-10 flex items-center justify-center text-slate-700 font-medium select-none">30</div>
          
          {/* Calendar day units */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25].map((day) => {
            const hasDotStyle = getDayDotStyle(day);
            const isSelected = selectedDay === day;
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`relative h-10 flex flex-col items-center justify-center rounded-xl focus:outline-none transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-indigo-600/20 ring-1 ring-indigo-500/50 text-indigo-400 font-bold shadow-md scale-105"
                    : "text-slate-300 hover:bg-slate-900"
                }`}
              >
                <span className="text-[11px] font-semibold">{day}</span>
                {hasDotStyle && (
                  <span className={`w-1.5 h-1.5 rounded-full mt-0.5 ${hasDotStyle}`} />
                )}
              </button>
            );
          })}
        </div>

        {/* Calendar Legend Bar */}
        <div className="p-3.5 bg-slate-900/40 border-t border-slate-900 flex gap-5 justify-center text-[10px] font-mono font-bold select-none uppercase tracking-widest">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            <span className="text-slate-500">Present</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="text-slate-500">Late</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            <span className="text-slate-500">Absent</span>
          </div>
        </div>
      </section>

      {/* Selected Day Status Details */}
      {selectedDay && (
        <div className="bg-slate-950/50 border border-slate-800 p-4 rounded-2xl font-sans text-xs flex flex-col gap-2 shadow-inner">
          <div className="flex justify-between items-center text-slate-500 border-b border-slate-900 pb-2 mb-1.5 font-medium">
            <span>Selected Date:</span>
            <span className="font-mono text-slate-300">{months[currentMonthIndex]} {selectedDay}, 2023</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold text-slate-300">Daily Attendance Status:</span>
            <span className={`px-2.5 py-1 rounded-full font-bold text-[9px] uppercase tracking-widest font-mono ${
              getDayDotLabel(selectedDay) === "Present"
                ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                : getDayDotLabel(selectedDay) === "Late"
                ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                : getDayDotLabel(selectedDay) === "Absent"
                ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                : "bg-slate-800 text-slate-400 border border-slate-700"
            }`}>
              {getDayDotLabel(selectedDay)}
            </span>
          </div>
        </div>
      )}

      {/* Detailed Breakdown section */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
          <span className="w-2 h-2 bg-indigo-500 rounded-full" />
          Subject Breakdown
        </h3>

        <div className="space-y-2.5">
          {subjectAttendances.map((sub) => (
            <div
              key={sub.id}
              onClick={() => setActiveSubject(sub)}
              className="bg-[#0c0c0c] p-4.5 rounded-2xl border border-slate-800 shadow-2xl flex items-center gap-4 transition-all duration-300 cursor-pointer hover:border-slate-700 hover:-translate-y-0.5 group active:scale-[0.99]"
            >
              {/* Material Icons for subjects */}
              <div className="w-11 h-11 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/20">
                <span className="material-symbols-outlined text-lg font-bold">
                  {sub.icon}
                </span>
              </div>

              {/* Subject Breakdown percentages */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-white truncate">
                  {sub.subject}
                </h4>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[10px] sm:text-xs font-semibold text-slate-500 font-mono leading-none shrink-0">
                    Attended: {sub.attended}/{sub.total}
                  </span>
                  <div className="flex-1 h-1.5 bg-slate-900 rounded-full overflow-hidden shrink-1 border border-slate-850">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300"
                      style={{ width: `${sub.percentage}%` }}
                    />
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold text-indigo-400 shrink-0 leading-none">
                    {sub.percentage}%
                  </span>
                </div>
              </div>

              <span className="material-symbols-outlined text-slate-500 text-base group-hover:translate-x-0.5 group-hover:text-white transition-all">
                chevron_right
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Detailed Attendance Log Modal per Subject */}
      <AnimatePresence>
        {activeSubject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-40"
              onClick={() => setActiveSubject(null)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0c0c0c] border border-slate-800 rounded-2xl w-full max-w-sm p-6 z-50 shadow-2xl relative"
            >
              <button
                onClick={() => setActiveSubject(null)}
                className="absolute top-4 right-4 text-slate-500 hover:text-white hover:bg-slate-900 p-1.5 rounded-full text-xs font-bold transition-colors"
              >
                <span className="material-symbols-outlined text-sm font-bold">close</span>
              </button>

              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-base font-semibold">{activeSubject.icon}</span>
                </div>
                <h4 className="text-sm font-bold text-white font-sans">{activeSubject.subject}</h4>
              </div>

              <div className="space-y-3 text-xs mb-5">
                <div className="flex justify-between items-center p-3 bg-slate-950/50 rounded-xl border border-slate-900">
                  <span className="text-slate-400">Total classes:</span>
                  <span className="font-bold text-white">{activeSubject.total} sessions</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-950/50 rounded-xl border border-slate-900">
                  <span className="text-slate-400">Attended count:</span>
                  <span className="font-bold text-emerald-400">{activeSubject.attended} sessions</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-950/50 rounded-xl border border-slate-900">
                  <span className="text-slate-400">Unattended count:</span>
                  <span className="font-bold text-rose-450 text-rose-400">{activeSubject.total - activeSubject.attended} sessions</span>
                </div>
              </div>

              {/* Highly interactive simulation button */}
              <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-900 flex flex-col gap-2.5">
                <p className="text-[10px] text-slate-400 font-sans leading-relaxed text-center">
                  Simulate attending a scheduled lecture slot for {activeSubject.subject} to update percentages in real-time:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      if (onAddAttendanceLog) {
                        onAddAttendanceLog(activeSubject.id, true);
                        setActiveSubject(null);
                      }
                    }}
                    className="py-2 px-3 text-center bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg text-[10px] cursor-pointer active:scale-95 transition-all shadow-md"
                  >
                    Attended Slot (+1)
                  </button>
                  <button
                    onClick={() => {
                      if (onAddAttendanceLog) {
                        onAddAttendanceLog(activeSubject.id, false);
                        setActiveSubject(null);
                      }
                    }}
                    className="py-2 px-3 text-center bg-slate-900 border border-slate-800 text-slate-300 rounded-lg text-[10px] hover:bg-slate-800 cursor-pointer active:scale-95 transition-all"
                  >
                    Missed Slot (+1)
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
