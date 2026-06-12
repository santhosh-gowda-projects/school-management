/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ClassSchedule, Assignment } from "../types";

interface DashboardViewProps {
  studentName: string;
  classes: ClassSchedule[];
  assignments: Assignment[];
  onCompleteAssignment: (id: string) => void;
  onAddAssignment: (assignment: Omit<Assignment, "id" | "completed">) => void;
  onOpenCalendar: () => void;
}

export default function DashboardView({
  studentName,
  classes,
  assignments,
  onCompleteAssignment,
  onAddAssignment,
  onOpenCalendar,
}: DashboardViewProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDueDate, setNewDueDate] = useState("DUE IN 2 DAYS");
  const [newUrgency, setNewUrgency] = useState<"urgent" | "normal">("normal");
  const [newDesc, setNewDesc] = useState("");

  const [activeClassDetail, setActiveClassDetail] = useState<ClassSchedule | null>(null);
  const [joinSuccessId, setJoinSuccessId] = useState<string | null>(null);

  const handleSaveAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onAddAssignment({
      title: newTitle,
      dueDateLabel: newDueDate,
      dueDateStatus: newUrgency,
      description: newDesc || "No supplementary description provided.",
      memberCount: Math.floor(Math.random() * 6) + 1,
    });
    setNewTitle("");
    setNewDesc("");
    setNewDueDate("DUE IN 2 DAYS");
    setNewUrgency("normal");
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Welcome Message text */}
      <section className="mb-4 animate-fade-in">
        <h2 className="text-3xl font-extrabold font-sans tracking-tight text-white">
          Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">{studentName}</span>
        </h2>
        <p className="text-sm text-slate-400 font-medium mt-1">
          You have <span className="font-semibold text-indigo-400">{classes.length} classes</span> and{" "}
          <span className="font-semibold text-purple-400">{assignments.filter(a => !a.completed).length} assignments</span> today.
        </p>
      </section>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* GPA Card with blue accent on the left */}
        <div className="bento-card relative overflow-hidden flex flex-col justify-between p-6 bg-[#0c0c0c] border border-slate-800 rounded-[2rem] shadow-2xl">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500" />
          <div>
            <span className="text-xs font-bold font-sans text-slate-500 uppercase tracking-widest">
              Current GPA
            </span>
            <div className="mt-2 text-3xl font-extrabold text-white tracking-tight">
              3.8
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full select-none border border-emerald-400/20">
              <span className="material-symbols-outlined text-[12px] font-bold">trending_up</span>
              +0.2
            </span>
            <span className="text-[10px] font-semibold text-slate-500">Peak academic tier</span>
          </div>
        </div>

        {/* Attendance Percentage Card */}
        <div className="bento-card flex flex-col justify-between p-6 bg-[#0c0c0c] border border-slate-800 rounded-[2rem] shadow-2xl">
          <div>
            <span className="text-xs font-bold font-sans text-slate-500 uppercase tracking-widest">
              Attendance
            </span>
            <div className="mt-2 text-3xl font-extrabold text-white tracking-tight">
              95%
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full w-[95%] rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Today's Schedule */}
      <section className="bg-[#0c0c0c] border border-slate-800 p-6 rounded-[2rem] shadow-2xl">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
            Today's Schedule
          </h3>
          <button
            onClick={onOpenCalendar}
            className="text-xs font-bold text-indigo-400 hover:text-indigo-300 hover:underline transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>View Calendar</span>
            <span className="material-symbols-outlined text-xs">arrow_right_alt</span>
          </button>
        </div>

        <div className="space-y-3">
          {classes.map((cls) => {
            const isLiveNow = cls.isActive;
            return (
              <div
                key={cls.id}
                onClick={() => setActiveClassDetail(cls)}
                className={`flex gap-4 p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  isLiveNow
                    ? "bg-[#141414] border-indigo-500/40 relative hover:border-indigo-500/80 shadow-lg scale-[1.01]"
                    : "bg-slate-950/40 border-slate-800/60 hover:bg-[#121212] hover:border-slate-700"
                }`}
              >
                {/* Active strip */}
                {isLiveNow && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-indigo-500 rounded-r-md" />
                )}

                {/* Time Indicator Container */}
                <div
                  className={`flex flex-col items-center justify-center min-w-[68px] py-1.5 rounded-xl text-center ${
                    isLiveNow
                      ? "bg-indigo-600 text-white font-bold shadow-md"
                      : "bg-[#0c0c0c] text-slate-400 border border-slate-800 font-medium"
                  }`}
                >
                  <span className="text-xs font-semibold leading-none">{cls.time}</span>
                  <span className="text-[9px] font-extrabold tracking-widest mt-1 opacity-90 font-mono">{cls.period}</span>
                </div>

                {/* Class Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-sm font-bold text-white truncate">
                      {cls.title}
                    </h4>
                    {isLiveNow && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[8px] font-extrabold uppercase tracking-widest animate-pulse">
                        LIVE NOW
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-1.5 text-slate-400 font-sans text-xs">
                    <span className="material-symbols-outlined text-sm text-slate-500 leading-none">
                      {isLiveNow ? "meeting_room" : cls.title.toLowerCase().includes("lab") ? "computer" : "location_on"}
                    </span>
                    <span className="truncate">{cls.location}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Upcoming Assignments section */}
      <section className="bg-[#0c0c0c] border border-slate-800 p-6 rounded-[2rem] shadow-2xl">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            Upcoming Assignments
          </h3>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 hover:underline cursor-pointer bg-indigo-500/10 px-3.5 py-2 rounded-xl border border-indigo-500/20"
          >
            <span className="material-symbols-outlined text-sm font-bold">add</span> Add New
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {assignments.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400 bg-slate-950/40 rounded-2xl border border-dashed border-slate-800">
              No outstanding assignments! Great work.
            </div>
          ) : (
            assignments.map((assignment) => {
              const isUrgent = assignment.dueDateStatus === "urgent";
              return (
                <div
                  key={assignment.id}
                  className={`relative overflow-hidden bg-[#0a0a0a] p-5 rounded-2xl border border-slate-800 transition-all duration-300 hover:border-slate-700/85 group ${
                    assignment.completed ? "opacity-50" : ""
                  }`}
                >
                  {/* Top Bar inside card */}
                  <div className="flex justify-between items-start mb-3 gap-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <button
                        onClick={() => onCompleteAssignment(assignment.id)}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer transition-colors shrink-0 ${
                          assignment.completed
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : isUrgent
                            ? "bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20"
                            : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-850"
                        }`}
                        title={assignment.completed ? "Mark as Incomplete" : "Mark as Complete"}
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {assignment.completed ? "check" : isUrgent ? "priority_high" : "description"}
                        </span>
                      </button>
                      <h4 className={`text-sm font-bold text-white truncate ${assignment.completed ? "line-through text-slate-500" : ""}`}>
                        {assignment.title}
                      </h4>
                    </div>
                    {!assignment.completed && (
                      <span
                        className={`text-[9px] font-extrabold px-2.5 py-1 rounded-full whitespace-nowrap uppercase tracking-widest font-mono ${
                          isUrgent ? "text-rose-400 bg-rose-500/10 border border-rose-500/20" : "text-slate-400 bg-slate-800/80 border border-slate-700/50"
                        }`}
                      >
                        {assignment.dueDateLabel}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed mb-5 line-clamp-2">
                    {assignment.description}
                  </p>

                  {/* Footer inside card */}
                  <div className="flex items-center justify-between pointer-events-auto">
                    {/* Collapsed Avatar Count representation */}
                    <div className="flex -space-x-1.5 select-none my-1">
                      {Array.from({ length: Math.min(3, assignment.memberCount) }).map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-6.5 h-6.5 rounded-full border-2 border-[#0c0c0c] text-[8px] flex items-center justify-center font-bold overflow-hidden bg-slate-800 text-slate-300`}
                        >
                          <span className="material-symbols-outlined text-[11px]">person</span>
                        </div>
                      ))}
                      {assignment.memberCount > 3 && (
                        <div className="w-6.5 h-6.5 rounded-full border-2 border-[#0c0c0c] bg-indigo-600 text-[8px] flex items-center justify-center text-white font-semibold">
                          +{assignment.memberCount - 3}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => onCompleteAssignment(assignment.id)}
                      className={`material-symbols-outlined text-indigo-400 hover:text-indigo-300 group-hover:translate-x-1 transition-transform cursor-pointer text-lg ${
                        assignment.completed ? "pointer-events-none opacity-20" : ""
                      }`}
                    >
                      arrow_forward
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Class Syllabus details drawer modal popup */}
      <AnimatePresence>
        {activeClassDetail && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-40"
              onClick={() => {
                setActiveClassDetail(null);
                setJoinSuccessId(null);
              }}
            />
            <motion.div
              initial={{ y: 100, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 100, opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm bg-[#0c0c0c] border border-slate-800 rounded-2xl p-6 z-50 shadow-2xl"
            >
              <button
                onClick={() => {
                  setActiveClassDetail(null);
                  setJoinSuccessId(null);
                }}
                className="absolute top-4 right-4 text-slate-500 hover:text-white hover:bg-slate-900 p-1.5 rounded-full transition-colors"
              >
                <span className="material-symbols-outlined text-sm font-bold">close</span>
              </button>

              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-10 h-10 rounded-xl bg-indigo-900/30 flex items-center justify-center border border-indigo-500/20">
                  <span className="material-symbols-outlined text-indigo-400 text-2xl">school</span>
                </div>
                <h4 className="text-base font-bold text-white font-sans">{activeClassDetail.title}</h4>
              </div>

              <div className="space-y-3 font-sans text-xs">
                <div className="flex bg-slate-950/50 p-3 rounded-xl border border-slate-900 justify-between items-center">
                  <span className="text-slate-400 font-medium">Timeslot:</span>
                  <span className="font-semibold text-white">
                    {activeClassDetail.time} <span className="text-indigo-400 font-mono text-[10px] uppercase font-bold tracking-widest bg-indigo-505/10 px-2 py-0.5 rounded border border-indigo-500/20">{activeClassDetail.period}</span>
                  </span>
                </div>
                <div className="flex bg-slate-950/50 p-3 rounded-xl border border-slate-900 justify-between items-center">
                  <span className="text-slate-400 font-medium">Instructor:</span>
                  <span className="font-semibold text-white">{activeClassDetail.instructor}</span>
                </div>
                <div className="flex bg-slate-950/50 p-3 rounded-xl border border-slate-900 justify-between items-center">
                  <span className="text-slate-400 font-medium">Venue:</span>
                  <span className="font-semibold text-white">{activeClassDetail.location}</span>
                </div>
                
                {activeClassDetail.isActive && (
                  <div className="mt-5 p-4 bg-indigo-950/30 text-indigo-200 rounded-xl flex flex-col items-center gap-3 border border-indigo-500/20">
                    <span className="text-xs font-semibold text-center leading-normal">Virtual Live classroom and lecture stream are currently active!</span>
                    
                    {joinSuccessId === activeClassDetail.id ? (
                      <div className="w-full text-center py-2 px-3 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5">
                        <span className="material-symbols-outlined text-sm">check_circle</span>
                        <span>Connected to streaming node</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setJoinSuccessId(activeClassDetail.id);
                        }}
                        className="w-full text-center bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-3 rounded-lg text-xs font-bold cursor-pointer active:scale-95 transition-all shadow-md"
                      >
                        Join Live Lecture Now
                      </button>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Assignment Popup Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-40"
              onClick={() => setShowAddModal(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0c0c0c] border border-slate-800 rounded-2xl w-full max-w-sm p-6 z-50 shadow-2xl relative"
            >
              <h4 className="text-base font-extrabold text-white mb-4 font-sans border-b border-slate-800 pb-3">
                Create New Assignment
              </h4>
              <form onSubmit={handleSaveAssignment} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Title</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Chemistry Homework 3"
                    className="w-full px-3.5 py-2.5 border border-slate-800 rounded-xl text-xs font-medium bg-slate-950 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-white placeholder-slate-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Due Label</label>
                    <input
                      type="text"
                      required
                      value={newDueDate}
                      onChange={(e) => setNewDueDate(e.target.value)}
                      placeholder="e.g. DUE IN 3 DAYS"
                      className="w-full px-3.5 py-2.5 border border-slate-800 rounded-xl text-xs font-medium bg-slate-950 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-white placeholder-slate-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Priority</label>
                    <select
                      value={newUrgency}
                      onChange={(e) => setNewUrgency(e.target.value as "urgent" | "normal")}
                      className="w-full px-3 py-2.5 border border-slate-800 rounded-xl text-xs font-medium bg-slate-950 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-white h-[38px]"
                    >
                      <option value="normal">Normal</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Brief Description</label>
                  <textarea
                    rows={2}
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    placeholder="Provide details about delivery instructions etc."
                    className="w-full px-3.5 py-2.5 border border-slate-800 rounded-xl text-xs font-medium bg-slate-950 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-white resize-none placeholder-slate-600"
                  />
                </div>

                <div className="flex gap-3 justify-end pt-3 border-t border-slate-800 mt-5">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-3.5 py-2 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-colors cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
