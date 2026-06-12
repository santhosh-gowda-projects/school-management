/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CourseGrade } from "../types";

interface GradesViewProps {
  grades: CourseGrade[];
  onAddCourseGrade: (course: CourseGrade) => void;
}

export default function GradesView({ grades, onAddCourseGrade }: GradesViewProps) {
  const [filter, setFilter] = useState<"All" | "A" | "A_Minus" | "B_Plus">("All");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Course grade form states
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [instructor, setInstructor] = useState("");
  const [gradeVal, setGradeVal] = useState("A");
  const [progressVal, setProgressVal] = useState(85);

  const filteredGrades = grades.filter((grade) => {
    if (filter === "All") return true;
    if (filter === "A") return grade.grade === "A";
    if (filter === "A_Minus") return grade.grade === "A-";
    if (filter === "B_Plus") return grade.grade === "B+";
    return true;
  });

  const handleCreateGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !title) return;
    onAddCourseGrade({
      id: "course-" + Date.now(),
      code,
      title,
      instructor: instructor || "Prof. Unknown",
      grade: gradeVal,
      progress: Number(progressVal),
    });
    setCode("");
    setTitle("");
    setInstructor("");
    setProgressVal(85);
    setGradeVal("A");
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Stats */}
      <section className="mb-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-sans tracking-tight">
          Grades &amp; Performance
        </h2>
        <p className="text-xs text-slate-400 font-medium mt-1">
          Cumulative summary for current active term of Year 3.
        </p>
      </section>

      {/* Primary Performance stats */}
      <section className="grid grid-cols-2 gap-4">
        {/* Semester GPA in dark bento container */}
        <div className="bento-card bg-[#0c0c0c] border border-slate-800 p-6 rounded-[2rem] shadow-2xl flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold font-sans text-slate-500 block mb-1 uppercase tracking-widest">
              Semester GPA
            </span>
            <h3 className="text-3xl font-extrabold text-white tracking-tight">
              3.82
            </h3>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-indigo-400 font-bold text-xs">
            <span className="material-symbols-outlined text-sm font-bold">trending_up</span>
            <span>+0.15 from last term</span>
          </div>
        </div>

        {/* Rank in Class in Deep rich indigo bento container */}
        <div className="bento-card bg-[#4f46e5]/90 text-white p-6 rounded-[2rem] shadow-2xl flex flex-col justify-between border-none">
          <div>
            <span className="text-xs font-bold font-sans text-indigo-200 block mb-1 uppercase tracking-widest">
              Rank in Class
            </span>
            <h3 className="text-3xl font-extrabold tracking-tight">
              12<span className="text-sm opacity-80 font-normal"> / 240</span>
            </h3>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-indigo-200 font-bold">
            <span className="material-symbols-outlined text-sm font-bold">workspace_premium</span>
            <span>Top 5% overall</span>
          </div>
        </div>
      </section>

      {/* Courses and Filter */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
            Current Courses
          </h3>

          <div className="flex gap-2.5">
            <button
              onClick={() => setShowAddModal(true)}
              className="text-xs font-bold text-indigo-400 hover:text-indigo-300 border border-indigo-500/25 px-3 py-1.5 rounded-xl bg-indigo-500/10 cursor-pointer"
            >
              Add Course
            </button>

            <div className="relative">
              <button
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="text-slate-300 hover:text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-xl transition-colors"
              >
                Filter: {filter.replace("_", " ")}
                <span className="material-symbols-outlined text-base">filter_list</span>
              </button>

              {/* Filter popup */}
              <AnimatePresence>
                {showFilterDropdown && (
                  <>
                    <div className="fixed inset-0 z-45 bg-transparent" onClick={() => setShowFilterDropdown(false)} />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -5 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -5 }}
                      className="absolute right-0 mt-2 w-36 bg-[#0c0c0c] border border-slate-850 rounded-xl shadow-2xl z-55 overflow-hidden divide-y divide-slate-800"
                    >
                      <button
                        onClick={() => {
                          setFilter("All");
                          setShowFilterDropdown(false);
                        }}
                        className="w-full text-left px-3.5 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-900 font-medium h-9 block cursor-pointer transition-colors"
                      >
                        All Grades
                      </button>
                      <button
                        onClick={() => {
                          setFilter("A");
                          setShowFilterDropdown(false);
                        }}
                        className="w-full text-left px-3.5 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-900 font-medium h-9 block cursor-pointer transition-colors"
                      >
                        Grade A
                      </button>
                      <button
                        onClick={() => {
                          setFilter("A_Minus");
                          setShowFilterDropdown(false);
                        }}
                        className="w-full text-left px-3.5 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-900 font-medium h-9 block cursor-pointer transition-colors"
                      >
                        Grade A-
                      </button>
                      <button
                        onClick={() => {
                          setFilter("B_Plus");
                          setShowFilterDropdown(false);
                        }}
                        className="w-full text-left px-3.5 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-900 font-medium h-9 block cursor-pointer transition-colors"
                      >
                        Grade B+
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="space-y-3.5">
          {filteredGrades.map((course) => (
            <div
              key={course.id}
              className="bg-[#0c0c0c] p-5 rounded-[2rem] border border-slate-800 shadow-2xl transition-all duration-300 hover:border-slate-700 hover:translate-y-[-1px]"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-white truncate">
                    {course.title}
                  </h4>
                  <p className="text-xs font-semibold text-slate-500 font-mono mt-1">
                    {course.code} • {course.instructor}
                  </p>
                </div>

                {/* Highly elegant visual grade badge */}
                <div className="bg-indigo-600/25 text-indigo-400 border border-indigo-500/20 px-3.5 py-1.5 rounded-xl shrink-0 font-extrabold font-mono text-sm sm:text-base flex items-center justify-center min-w-[38px] shadow-lg">
                  {course.grade}
                </div>
              </div>

              {/* Progress Bar inside courses */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-end text-[10px] font-mono uppercase tracking-wider">
                  <span className="font-bold text-slate-500">Term Progress</span>
                  <span className="font-bold text-slate-300">{course.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-850">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Insights/Advice Section with lovely background icon accent */}
      <section className="mt-6">
        <div className="relative overflow-hidden bg-slate-950 border border-slate-800 rounded-[2rem] p-6 shadow-2xl">
          <div className="relative z-10">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm font-bold text-indigo-400">auto_awesome</span>
              Performance Insight
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Your performance in quantitative subjects is exceptionally high. Consider taking{" "}
              <span className="font-semibold text-indigo-400">Advanced Algorithmic Trading</span> as an
              elective next semester.
            </p>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-[0.03] text-indigo-400 select-none pointer-events-none">
            <span className="material-symbols-outlined text-[120px] font-light">auto_awesome</span>
          </div>
        </div>
      </section>

      {/* Course Adding Grade Modal */}
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
              className="bg-[#0c0c0c] border border-slate-800 border bg-white rounded-2xl w-full max-w-sm p-6 z-50 shadow-2xl relative"
            >
              <h4 className="text-base font-extrabold text-white mb-4 pb-3 border-b border-slate-800 font-sans">
                Add Course and Current Grade
              </h4>
              <form onSubmit={handleCreateGrade} className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-1">
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Code</label>
                    <input
                      type="text"
                      required
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="e.g. CS-402"
                      className="w-full px-3.5 py-2.5 border border-slate-850 rounded-xl text-xs font-medium bg-slate-950 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 uppercase placeholder-slate-650"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Course Title</label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Software Testing Lab"
                      className="w-full px-3.5 py-2.5 border border-slate-850 rounded-xl text-xs font-medium bg-slate-950 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder-slate-650"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Professor</label>
                  <input
                    type="text"
                    required
                    value={instructor}
                    onChange={(e) => setInstructor(e.target.value)}
                    placeholder="e.g. Dr. John Carter"
                    className="w-full px-3.5 py-2.5 border border-slate-850 rounded-xl text-xs font-medium bg-slate-950 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder-slate-650"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Grade</label>
                    <select
                      value={gradeVal}
                      onChange={(e) => setGradeVal(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-850 rounded-xl text-xs font-medium bg-slate-950 text-white h-[38px] focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    >
                      <option value="A">A</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B">B</option>
                      <option value="B-">B-</option>
                      <option value="C+">C+</option>
                      <option value="C">C</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Progress ({progressVal}%)</label>
                    <input
                      type="range"
                      min={10}
                      max={100}
                      value={progressVal}
                      onChange={(e) => setProgressVal(Number(e.target.value))}
                      className="w-full mt-3.5 accent-indigo-500"
                    />
                  </div>
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
                    Save Course
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
