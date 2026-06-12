/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  currentRole: "student" | "parent";
  onRoleToggle: () => void;
  notificationCount: number;
  onClearNotifications: () => void;
}

export default function Header({
  currentRole,
  onRoleToggle,
  notificationCount,
  onClearNotifications,
}: HeaderProps) {
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);

  // Avatar source based on role
  const alexAvatar = "https://lh3.googleusercontent.com/aida-public/AB6AXuC8Nerw2Uigr4NAks26_R881dD6U7MwS3szI69_KHI00HlXzuvKYfFiOxyoCSvcIWCVEkoOe2Eavevi0wFG8TpLHc9qMfAth5_MbQoHAZ58Gg7itTbJ3Rj5wEZNZOjwZuSbBfnHol4_Awkg4l2td2cFFO9cDO4zIE3CmRUqiSGN-45yaN3SSZMCNZJvTWsMSRVFmNfnxEmhTnrsHCEUDGRxgJ0fOL2cTDPrOO4gFC2TwxBfvbMiVHzfn4LQ7s5ZqLalN25SiUHGY0I";
  const reynoldsAvatar = "https://lh3.googleusercontent.com/aida-public/AB6AXuBkRSIcKsXQ4ybWQp0RmYl2AYwDVPKhV6Z9rywWXzXUC1RmtJZin7wIhWvPI5QbBAJeXwrok4VK0BQTTRAkWEMU7k35mBsdiXMRhXJvTJIfp-aD-Ya1G1sqtETkZMgvaZ6FO5cesQRvA2i8tUXCxETbJU6roOCTKSDatiaBVfVJ5esyXTJcWwCEXItpBrGuhJgesgnfxoI5udbQxJjx4kxe1SlFHxEl2-0R19dj4lLExbRhGJ45aPc0iMWw1u7YR1uuoQ0CUeObPkM";

  const notifications = [
    { id: 1, text: "Dr. Aris Thorne updated 'Advanced Data Structures' progress.", time: "10 mins ago" },
    { id: 2, text: "New Parent-Teacher Chat message from Mr. Henderson.", time: "2h ago" },
    { id: 3, text: "Annual Sports Day has been rescheduled due to climate conditions.", time: "2h ago" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-[#0c0c0c]/80 backdrop-blur-md border-b border-slate-800 shadow-lg">
      <div className="flex items-center gap-3">
        {/* Clickable Profile Avatar to toggle user view or inform of state */}
        <div className="relative group">
          <button
            onClick={onRoleToggle}
            className="w-10 h-10 rounded-full overflow-hidden bg-slate-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            title={`Active viewpoint: ${currentRole === "student" ? "Student (Alex)" : "Parent (Mrs. Reynolds)"}. Click to switch roles!`}
          >
            <img
              alt="User profile"
              className="w-full h-full object-cover"
              src={currentRole === "student" ? alexAvatar : reynoldsAvatar}
            />
          </button>
          <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-[#0c0c0c]" />
          
          {/* Subtle tooltip help hover */}
          <div className="absolute left-0 top-12 scale-0 group-hover:scale-100 transition-all duration-200 origin-top-left bg-slate-900 text-white text-[10px] py-1 px-2 rounded shadow-lg whitespace-nowrap z-50 pointer-events-none">
            Click avatar to switch between Student & Parent modes
          </div>
        </div>

        <div className="flex flex-col">
          <h1 className="text-xl font-bold tracking-tight text-white font-sans">
            Academic Pro <span className="text-indigo-400 font-normal">/ Active</span>
          </h1>
          <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider -mt-1 font-mono">
            {currentRole === "student" ? "Student View (Alex)" : "Parent View (Mrs. Reynolds)"}
          </span>
        </div>
      </div>

      <div className="relative">
        <button
          onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
          className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-900 transition-colors duration-150 active:scale-95 text-indigo-400 hover:text-white cursor-pointer border border-transparent hover:border-slate-800"
          id="btn-notifications"
          aria-label="Notifications"
        >
          <span className="material-symbols-outlined text-[24px]">notifications</span>
          {notificationCount > 0 && (
            <span className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500 text-[9px] font-bold text-white ring-2 ring-[#0c0c0c] animate-pulse">
              {notificationCount}
            </span>
          )}
        </button>

        {/* Dynamic Notification Slider/Popup */}
        <AnimatePresence>
          {showNotificationDropdown && (
            <>
              {/* Overlay Backdrop to dismiss */}
              <div 
                className="fixed inset-0 z-40 bg-transparent" 
                onClick={() => setShowNotificationDropdown(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute right-0 mt-2 w-80 bg-[#0c0c0c] rounded-2xl shadow-2xl border border-slate-800 z-55 overflow-hidden"
              >
                <div className="p-3 bg-slate-900 border-b border-slate-800 flex justify-between items-center text-white">
                  <span className="text-xs font-bold">Notifications</span>
                  {notificationCount > 0 && (
                    <button
                      onClick={() => {
                        onClearNotifications();
                        setShowNotificationDropdown(false);
                      }}
                      className="text-[10px] text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer"
                    >
                      Clear All
                    </button>
                  )}
                </div>
                <div className="divide-y divide-slate-800/60 overflow-y-auto max-h-64 custom-scrollbar bg-[#0c0c0c]">
                  {notificationCount === 0 ? (
                    <div className="p-6 text-center text-xs text-slate-400 flex flex-col items-center justify-center gap-1.5 bg-[#0c0c0c]">
                      <span className="material-symbols-outlined text-slate-500 text-3xl">notifications_none</span>
                      <span>No new notifications</span>
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div key={notif.id} className="p-3 hover:bg-slate-900 transition-colors bg-[#0c0c0c]">
                        <p className="text-xs text-slate-200 leading-normal">{notif.text}</p>
                        <span className="text-[10px] text-slate-500 font-mono mt-1 block">{notif.time}</span>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
