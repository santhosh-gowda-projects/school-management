/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Notice, ChatMessage, MeetingProposal } from "../types";

interface PortalViewProps {
  notices: Notice[];
  onAddNotice?: (notice: Notice) => void;
  chatMessages: ChatMessage[];
  onSendMessage: (text: string) => void;
  meetingProposal: MeetingProposal;
  onAcceptMeeting: () => void;
}

export default function PortalView({
  notices,
  onAddNotice,
  chatMessages,
  onSendMessage,
  meetingProposal,
  onAcceptMeeting,
}: PortalViewProps) {
  const [typedMessage, setTypedMessage] = useState("");
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Active sub-modals for auxiliary grid buttons
  const [activeAuxModal, setActiveAuxModal] = useState<
    "none" | "grades" | "attendance" | "fees" | "directory"
  >("none");

  // Custom inner alert/modal states to replace legacy native window.alerts
  const [viewingNotice, setViewingNotice] = useState<Notice | null>(null);
  const [actionAlert, setActionAlert] = useState<string | null>(null);
  const [feePaidSuccess, setFeePaidSuccess] = useState(false);

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedMessage.trim()) return;
    onSendMessage(typedMessage);
    setTypedMessage("");
  };

  const handleAuxClick = (type: "grades" | "attendance" | "fees" | "directory") => {
    setActiveAuxModal(type);
  };

  const reynoldsAvatar = "https://lh3.googleusercontent.com/aida-public/AB6AXuC8Nerw2Uigr4NAks26_R881dD6U7MwS3szI69_KHI00HlXzuvKYfFiOxyoCSvcIWCVEkoOe2Eavevi0wFG8TpLHc9qMfAth5_MbQoHAZ58Gg7itTbJ3Rj5wEZNZOjwZuSbBfnHol4_Awkg4l2td2cFFO9cDO4zIE3CmRUqiSGN-45yaN3SSZMCNZJvTWsMSRVFmNfnxEmhTnrsHCEUDGRxgJ0fOL2cTDPrOO4gFC2TwxBfvbMiVHzfn4LQ7s5ZqLalN25SiUHGY0I";
  const hendersonAvatar = "https://lh3.googleusercontent.com/aida-public/AB6AXuAmxGRaiNyqPvEmmxh7mDOXBfkzdyfHMgqRU5xqaW1mPJ8q96-CFpgvxOEQGhojFtTcKeVkGRWUC_rlS-mtCwpkxp8JyKeS5ja4ViPZb36EzhhU9SURHz92-_BZCrzEWqlw5Ye5LnHsGsIFgzye7DkG2er5yUtkAEE86F8q-h-GuFFMiX741EFAtK8uT78FptI4Ix43kviNUO--ZeIsEYWd-PUyJybiMyh9U7BcVu7igBOyvIx3FDCcCr9bnJNjc0O3JmTtkekihbc";

  return (
    <div className="space-y-6 text-slate-200">
      {/* Welcome Hero banner with parent credentials */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
        <div className="md:col-span-2 p-6 rounded-[2rem] bg-gradient-to-br from-indigo-600 to-purple-800 text-white shadow-2xl flex flex-col justify-between min-h-[150px] relative overflow-hidden">
          {/* Subtle logo vector outline graphic of a graduation cap or shield */}
          <div className="absolute top-0 right-0 p-8 opacity-[0.06] pointer-events-none text-white select-none translate-x-4 -translate-y-4">
            <span className="material-symbols-outlined text-[160px]">school</span>
          </div>

          <div className="relative z-10">
            <h2 className="text-2xl font-extrabold font-sans tracking-tight">
              Welcome back, Mrs. Reynolds
            </h2>
            <p className="text-xs sm:text-sm text-indigo-100 font-normal mt-1 max-w-md leading-relaxed">
              Stay updated with Lucas's academic journey, grades reports, school events and discuss statistics in real-time.
            </p>
          </div>

          <div className="flex gap-2.5 mt-4 relative z-10">
            <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-xl text-[10px] font-bold flex items-center gap-1.5 border border-white/5">
              <span className="material-symbols-outlined text-xs">school</span> Grade 4B
            </span>
            <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-xl text-[10px] font-bold flex items-center gap-1.5 border border-white/5">
              <span className="material-symbols-outlined text-xs">verified</span>{" "}
              {meetingProposal.status === "proposed" ? "2 New Notices" : "Meeting Scheduled"}
            </span>
          </div>
        </div>

        {/* Next Meeting container */}
        <div className="bento-card bg-[#0c0c0c] border border-slate-800 p-6 rounded-[2rem] flex flex-col justify-center items-center text-center shadow-2xl">
          <div className="w-11 h-11 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center mb-3 shadow-md">
            <span className="material-symbols-outlined text-lg font-bold">calendar_month</span>
          </div>
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 select-none font-mono">
            Next Meeting
          </h3>
          <p className="text-sm font-extrabold text-indigo-400 tracking-tight leading-none">
            {meetingProposal.status === "accepted" ? "Thursday, Oct 19 • 15:30" : "Tomorrow, 14:00"}
          </p>
          <p className="text-[10px] text-slate-500 font-mono mt-2">
            with {meetingProposal.teacherName} (Mathematics)
          </p>
        </div>
      </section>

      {/* Notices on left / Chat on right dynamic layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* School Notices Feed */}
        <section className="lg:col-span-5 space-y-3.5">
          <div className="flex items-center justify-between pb-1">
            <h3 className="text-lg font-bold text-white font-sans tracking-tight flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              School Notices
            </h3>
            <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300 hover:underline cursor-pointer select-none">
              View All
            </button>
          </div>

          <div className="space-y-3">
            {notices.map((notice) => {
              const isUrgent = notice.category === "URGENT";
              return (
                <div
                  key={notice.id}
                  className="bg-[#0c0c0c] border border-slate-800/80 p-4 rounded-xl transition-all hover:border-slate-700 hover:translate-y-[-1px] duration-300 shadow-xl cursor-pointer"
                  onClick={() => setViewingNotice(notice)}
                >
                  <div className="flex justify-between items-center mb-2.5">
                    <span
                      className={`px-2 py-0.5 rounded-lg text-[8px] font-extrabold uppercase tracking-widest font-mono ${
                        isUrgent
                          ? "bg-rose-500/10 text-rose-450 text-rose-400 border border-rose-500/20"
                          : "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                      }`}
                    >
                      {notice.category}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">
                      {notice.timeLabel}
                    </span>
                  </div>

                  <h4 className="text-xs sm:text-xs font-bold text-white mb-1.5">
                    {notice.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {notice.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Messaging Interface (Highly Interactive Mr Henderson Chat) */}
        <section className="lg:col-span-7 bg-[#0c0c0c] rounded-[2rem] overflow-hidden border border-slate-800 flex flex-col h-[420px] shadow-2xl">
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-850 bg-slate-900/45 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="relative shrink-0">
                <img
                  alt="Teacher"
                  className="w-10 h-10 rounded-full object-cover border border-slate-700"
                  src={hendersonAvatar}
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#0c0c0c] rounded-full animate-pulse" />
              </div>
              <div>
                <h4 className="text-xs sm:text-xs font-extrabold text-white leading-tight">
                  Mr. Henderson
                </h4>
                <p className="text-[10px] text-slate-400 font-sans mt-0.5">
                  Mathematics Teacher • <span className="text-green-400 font-medium font-mono uppercase text-[9px]">Online</span>
                </p>
              </div>
            </div>

            <div className="flex gap-2.5">
              <button
                onClick={() => setActionAlert("Voice Service: math.henderson@academicpro.edu • Zoom/Call line ready for Scheduled slots.")}
                className="p-1.5 rounded-xl hover:bg-slate-850 transition-colors text-indigo-400 cursor-pointer border border-transparent hover:border-slate-800"
                aria-label="Video Call"
              >
                <span className="material-symbols-outlined text-sm font-bold">videocam</span>
              </button>
              <button
                onClick={() => setActionAlert("Contact Details:\n• Instructor: Mr. Henderson\n• Email: math.henderson@academicpro.edu\n• Main Cabin: Room B-12")}
                className="p-1.5 rounded-xl hover:bg-slate-850 transition-colors text-indigo-400 cursor-pointer border border-transparent hover:border-slate-800"
                aria-label="Info"
              >
                <span className="material-symbols-outlined text-sm font-bold">info</span>
              </button>
            </div>
          </div>

          {/* Chat Body messages stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-slate-950/20">
            <div className="flex justify-center select-none">
              <span className="text-[9px] font-black text-slate-500 bg-slate-900 px-3 py-1 rounded-full uppercase tracking-widest font-mono border border-slate-800/40">
                Today
              </span>
            </div>

            {chatMessages.map((msg) => {
              const isMe = msg.sender === "parent";
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-[85%] ${isMe ? "ml-auto flex-row-reverse" : ""}`}
                >
                  <div className="flex flex-col gap-1">
                    <div
                      className={`p-3.5 rounded-2xl font-sans text-xs leading-normal shadow-md ${
                        isMe
                          ? "bg-indigo-600 text-white rounded-tr-none"
                          : "bg-slate-900 text-slate-100 rounded-tl-none border border-slate-800"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span
                      className={`text-[9px] text-slate-500 inline-block font-mono ${
                        isMe ? "text-right" : "text-left shadow-none"
                      }`}
                    >
                      {msg.time}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Meeting Proposal component inside chat */}
            <AnimatePresence>
              {meetingProposal.status === "proposed" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex justify-center py-2"
                >
                  <div className="bg-indigo-500/10 border border-indigo-500/25 p-4 rounded-xl flex items-center gap-3.5 max-w-sm shadow-xl">
                    <div className="w-8.5 h-8.5 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md">
                      <span className="material-symbols-outlined text-sm font-bold">event_available</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-bold text-white">
                        Proposed Meeting
                      </p>
                      <p className="text-[10px] text-slate-400 font-sans leading-none mt-1 whitespace-nowrap">
                        {meetingProposal.dateTimeLabel}
                      </p>
                    </div>
                    <button
                      onClick={onAcceptMeeting}
                      className="bg-indigo-600 text-white text-[10px] font-bold px-3 py-2 rounded-lg hover:bg-indigo-500 active:scale-95 transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-md"
                    >
                      Accept
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={chatBottomRef} />
          </div>

          {/* Chat text box entry */}
          <form onSubmit={handleSend} className="p-3 bg-slate-900/60 border-t border-slate-850">
            <div className="flex items-center gap-2 bg-slate-950 rounded-full px-3.5 py-1 border border-slate-850 hover:border-slate-800 focus-within:border-indigo-500 transition-colors">
              <button
                type="button"
                onClick={() => {
                  const phrases = [
                    "Hello Mr. Henderson, thank you for Lucas' progress update.",
                    "Is Lucas attending all lab classes regularly?",
                    "Hello! Regarding tomorrow's scheduled mathematics review...",
                  ];
                  setTypedMessage(phrases[Math.floor(Math.random() * phrases.length)]);
                }}
                className="text-slate-500 hover:text-indigo-400 transition-colors cursor-pointer p-1"
                title="Quick phrase replies"
              >
                <span className="material-symbols-outlined text-lg leading-none">add_circle</span>
              </button>
              <input
                type="text"
                placeholder="Type a message..."
                value={typedMessage}
                onChange={(e) => setTypedMessage(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none focus:outline-none focus:ring-0 placeholder:text-slate-650 font-sans text-xs font-semibold py-1.5 text-white"
              />
              <button
                type="submit"
                className="w-8 h-8 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full flex items-center justify-center cursor-pointer transition-transform active:scale-95 duration-75 shrink-0 shadow-md"
              >
                <span className="material-symbols-outlined text-xs leading-none">send</span>
              </button>
            </div>
          </form>
        </section>
      </div>

      {/* Secondary Information auxiliary card grid */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-3 select-none">
        <div
          onClick={() => handleAuxClick("grades")}
          className="bento-card p-5 bg-[#0c0c0c] border border-slate-800 hover:border-slate-705 rounded-2xl group cursor-pointer shadow-2xl active:scale-98"
        >
          <span className="material-symbols-outlined text-indigo-400 mb-2 group-hover:scale-110 group-hover:text-white transition-all text-xl block">
            grade
          </span>
          <h4 className="text-xs font-extrabold text-white tracking-tight font-sans">
            Grade Reports
          </h4>
          <p className="text-[10px] text-slate-500 mt-1 leading-none font-sans font-medium">
            View term performance
          </p>
        </div>

        <div
          onClick={() => handleAuxClick("attendance")}
          className="bento-card p-5 bg-[#0c0c0c] border border-slate-800 hover:border-slate-705 rounded-2xl group cursor-pointer shadow-2xl active:scale-98"
        >
          <span className="material-symbols-outlined text-indigo-400 mb-2 group-hover:scale-110 group-hover:text-white transition-all text-xl block">
            history_edu
          </span>
          <h4 className="text-xs font-extrabold text-white tracking-tight font-sans">
            Attendance Records
          </h4>
          <p className="text-[10px] text-slate-500 mt-1 leading-none font-sans font-medium">
            Track daily presence
          </p>
        </div>

        <div
          onClick={() => handleAuxClick("fees")}
          className="bento-card p-5 bg-[#0c0c0c] border border-slate-800 hover:border-slate-705 rounded-2xl group cursor-pointer shadow-2xl active:scale-98"
        >
          <span className="material-symbols-outlined text-indigo-400 mb-2 group-hover:scale-110 group-hover:text-white transition-all text-xl block">
            payments
          </span>
          <h4 className="text-xs font-extrabold text-white tracking-tight font-sans">
            Fees &amp; Billing
          </h4>
          <p className="text-[10px] text-slate-500 mt-1 leading-none font-sans font-medium">
            Manage school payments
          </p>
        </div>

        <div
          onClick={() => handleAuxClick("directory")}
          className="bento-card p-5 bg-[#0c0c0c] border border-slate-800 hover:border-slate-705 rounded-2xl group cursor-pointer shadow-2xl active:scale-98"
        >
          <span className="material-symbols-outlined text-indigo-400 mb-2 group-hover:scale-110 group-hover:text-white transition-all text-xl block">
            groups
          </span>
          <h4 className="text-xs font-extrabold text-white tracking-tight font-sans">
            Teacher Directory
          </h4>
          <p className="text-[10px] text-slate-500 mt-1 leading-none font-sans font-medium">
            Contact subject experts
          </p>
        </div>
      </section>

      {/* Custom info alert box */}
      <AnimatePresence>
        {actionAlert && (
          <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80"
              onClick={() => setActionAlert(null)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0c0c0c] border border-slate-800 p-5 rounded-2xl max-w-sm w-full z-55 shadow-2xl text-center"
            >
              <span className="material-symbols-outlined text-indigo-400 text-3xl mb-2 block">info</span>
              <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-line">{actionAlert}</p>
              <button
                onClick={() => setActionAlert(null)}
                className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-bold text-white transition-colors cursor-pointer shadow-md"
              >
                Close Connection
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Notice Details Modal */}
      <AnimatePresence>
        {viewingNotice && (
          <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80"
              onClick={() => setViewingNotice(null)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0c0c0c] border border-slate-800 p-6 rounded-[2rem] max-w-md w-full z-55 shadow-2xl"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="px-2.5 py-1 rounded-lg bg-indigo-500/15 border border-indigo-500/25 text-indigo-450 text-indigo-400 text-[9px] font-extrabold uppercase tracking-widest font-mono">
                  {viewingNotice.category} Notice
                </span>
                <span className="text-xs text-slate-500 font-mono font-semibold">{viewingNotice.timeLabel}</span>
              </div>
              <h4 className="text-sm font-extrabold text-white mb-3">{viewingNotice.title}</h4>
              <p className="text-xs text-slate-350 leading-relaxed font-sans">{viewingNotice.description}</p>
              <div className="mt-5 border-t border-slate-850 pt-3 flex justify-end">
                <button
                  onClick={() => setViewingNotice(null)}
                  className="px-4.5 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Return to Portal
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Auxiliary interactive modals slide popups */}
      <AnimatePresence>
        {activeAuxModal !== "none" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-40"
              onClick={() => {
                setActiveAuxModal("none");
                setFeePaidSuccess(false);
              }}
            />
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="bg-[#0c0c0c] border border-slate-800 rounded-2xl w-full max-w-md p-6 z-50 shadow-2xl relative max-h-[90dvh] overflow-y-auto custom-scrollbar"
            >
              <button
                onClick={() => {
                  setActiveAuxModal("none");
                  setFeePaidSuccess(false);
                }}
                className="absolute top-4 right-4 text-slate-500 hover:text-white hover:bg-slate-905 p-1.5 rounded-full text-xs font-bold transition-colors"
              >
                <span className="material-symbols-outlined text-sm font-bold">close</span>
              </button>

              {/* Modals content */}
              {activeAuxModal === "grades" && (
                <div>
                  <h4 className="text-sm font-extrabold text-white mb-4 border-b border-slate-800 pb-3 font-sans flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-indigo-400">grade</span>
                    Lucas' Complete Grade Reports (Grade 4B)
                  </h4>
                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex justify-between items-center p-3 bg-slate-950/50 rounded-xl border border-slate-900">
                      <span className="font-semibold text-slate-300">Mathematics (4B)</span>
                      <span className="font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20">A (96%)</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-950/50 rounded-xl border border-slate-900">
                      <span className="font-semibold text-slate-300">Science &amp; Nature</span>
                      <span className="font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">A- (91%)</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-950/50 rounded-xl border border-slate-900">
                      <span className="font-semibold text-slate-300">Languages &amp; Writing</span>
                      <span className="font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">B+ (89%)</span>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-relaxed pt-2">
                      Report Cards with administrative digital signature stamps are completed. Please verify outstanding balance clearance prior to requesting paper-copy stamps.
                    </p>
                  </div>
                </div>
              )}

              {activeAuxModal === "attendance" && (
                <div>
                  <h4 className="text-sm font-extrabold text-white mb-4 border-b border-slate-800 pb-3 font-sans flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-indigo-400">history_edu</span>
                    Lucas' Attendance Log Details
                  </h4>
                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex justify-between p-3 bg-slate-950/50 rounded-xl border border-slate-900 items-center">
                      <span className="font-semibold text-slate-300">Term Presence Rate:</span>
                      <span className="font-bold text-emerald-400 bg-emerald-500/10 px-2 rounded-lg border border-emerald-500/20">96.8%</span>
                    </div>
                    <div className="flex justify-between p-3 bg-slate-950/50 rounded-xl border border-slate-900 items-center">
                      <span className="font-semibold text-slate-300">Authorized Absences:</span>
                      <span className="font-bold text-slate-300 bg-slate-900 px-2 rounded-lg border border-slate-800">2 days</span>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-relaxed font-sans mt-2">
                      Excellent record. No compliance warning logs have been dispatched. If attendance thresholds slide below 90%, administrative guidelines demand counselor intervention.
                    </p>
                  </div>
                </div>
              )}

              {activeAuxModal === "fees" && (
                <div>
                  <h4 className="text-sm font-extrabold text-white mb-4 border-b border-slate-800 pb-3 font-sans flex items-center gap-1.5 align-middle">
                    <span className="material-symbols-outlined text-indigo-400">payments</span>
                    Fees &amp; Billing Statement
                  </h4>
                  <div className="space-y-3.5 text-xs">
                    {feePaidSuccess ? (
                      <div className="p-4 bg-emerald-500/10 text-emerald-300 rounded-xl border border-emerald-500/20 text-center flex flex-col items-center gap-1 shadow-lg animate-fade-in">
                        <span className="material-symbols-outlined text-2xl">check_box</span>
                        <p className="font-bold">Transaction Confirmed!</p>
                        <span className="text-[10px] opacity-90 leading-relaxed">
                          School registration balance is paid in full. Receipt synchronized with registration hub.
                        </span>
                      </div>
                    ) : (
                      <div className="p-4 bg-rose-500/10 text-rose-300 rounded-xl border border-rose-500/20">
                        <p className="font-bold font-mono">Outstanding Balance: $250.00</p>
                        <span className="text-[10px] block mt-1 opacity-90 leading-relaxed font-sans">
                          Grade 4 Chemistry Laboratory access and sports equipment booking balances are pending approval.
                        </span>
                      </div>
                    )}
                    
                    <div className="p-3 bg-slate-950/50 rounded-xl border border-slate-900 flex justify-between font-mono">
                      <span className="text-slate-400">Term Tuition Balance:</span>
                      <span className="font-bold text-emerald-400">$2,450.00 (PAID)</span>
                    </div>

                    {!feePaidSuccess && (
                      <button
                        onClick={() => {
                          setFeePaidSuccess(true);
                        }}
                        className="w-full text-center bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-xl font-bold text-xs active:scale-95 transition-all cursor-pointer mt-4"
                      >
                        Process Ledger Payment ($250.00)
                      </button>
                    )}
                  </div>
                </div>
              )}

              {activeAuxModal === "directory" && (
                <div>
                  <h4 className="text-sm font-extrabold text-white mb-4 border-b border-slate-800 pb-3 font-sans flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-indigo-400">groups</span>
                    Teacher Directory (Grade 4B)
                  </h4>
                  <div className="space-y-3 font-sans text-xs max-h-60 overflow-y-auto custom-scrollbar pr-1">
                    {[
                      { name: "Mr. Henderson", subject: "Mathematics" },
                      { name: "Prof. Miller", subject: "Political Science" },
                      { name: "Mrs. Ward", subject: "Class Counselor" },
                      { name: "Dr. Aris Thorne", subject: "Physical Science" },
                    ].map((teacher, idx) => (
                      <div key={idx} className="flex justify-between items-center p-2.5 border-b border-slate-850/60 font-medium">
                        <div>
                          <p className="font-bold text-white">{teacher.name}</p>
                          <span className="text-[10px] text-slate-500 font-mono">{teacher.subject}</span>
                        </div>
                        <button
                          onClick={() => {
                            setActionAlert(`Mail Client Stub:\nCreating drafts to: ${teacher.name.toLowerCase().replace(" ", "")}@school.edu`);
                          }}
                          className="px-3 py-1.5 text-[9px] font-bold border border-indigo-500/40 text-indigo-400 bg-indigo-500/10 hover:bg-indigo-600 hover:text-white rounded-lg transition-all"
                        >
                          Send Email
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
