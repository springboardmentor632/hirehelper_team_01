import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

const MyAddTask = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-bg-app relative">

      {/* Mobile Hamburger */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-6 right-6 z-50 p-2 bg-action-accept text-white rounded-md text-2xl"
      >
        {isSidebarOpen ? '✕' : '☰'}
      </button>

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
      />

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-text-primary">
            Add a New Task
          </h1>
          <p className="text-text-secondary">
            Fill out the details below
          </p>
        </header>

        {/* FORM */}
        <form className="w-full bg-[#E9FFC9] border border-[#6A994E] rounded-xl p-8 xl:p-12 space-y-8">

          {/* 1. Title */}
          <div>
            <label className="block font-semibold mb-1">Title</label>
            <input
              type="text"
              placeholder="Help moving furniture"
              className="w-full px-5 py-3 border rounded-md"
              required
            />
          </div>

          {/* 2. Description */}
          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              rows="4"
              placeholder="Describe the task in detail"
              className="w-full px-5 py-3 border rounded-md"
              required
            />
          </div>

          {/* 3. Location */}
          <div>
            <label className="block font-semibold mb-1">Location</label>
            <input
              type="text"
              placeholder="Downtown area"
              className="w-full px-5 py-3 border rounded-md"
              required
            />
          </div>

          {/* 4 & 5. Start and End Date/Time */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block font-semibold mb-1">Start Date / Time</label>
              <input
                type="datetime-local"
                className="w-full px-5 py-3 border rounded-md"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block font-semibold mb-1">End Date / Time</label>
              <input
                type="datetime-local"
                className="w-full px-5 py-3 border rounded-md"
                required
              />
            </div>
          </div>

          {/* 6. Image Upload */}
          <div>
            <label className="block font-semibold mb-2">Upload Image</label>
            <label className="w-full flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-12 cursor-pointer hover:bg-white/40 transition">
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <span className="text-sm text-gray-600 mt-2">
                Click or drag image here
              </span>
              <input type="file" accept="image/*" hidden />
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#3A5A40] text-white px-12 py-3 rounded-md font-semibold"
            >
              Post Task
            </button>
          </div>

        </form>
      </main>
    </div>
  );
};

export default MyAddTask;
