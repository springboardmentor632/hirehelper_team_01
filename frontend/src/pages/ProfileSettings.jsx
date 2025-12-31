import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Eye, EyeOff } from "lucide-react"; // For password visibility toggles

const ProfileSettings = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });

  const togglePassword = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="min-h-screen w-full flex bg-[#C7F5A5]">
      <Sidebar 
        isOpen={isSidebarOpen} 
        closeSidebar={() => setIsSidebarOpen(false)} 
      />

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-6 right-6 z-50 p-2 bg-[#3A5B22] text-white rounded-md"
      >
        {isSidebarOpen ? "✕" : "☰"}
      </button>

      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        <h1 className="text-3xl font-extrabold text-[#1E293B] mb-8">Profile & Account Settings</h1>

        <div className="max-w-5xl space-y-6">
          
          {/* Section 1: Profile Picture */}
          <section className="bg-[#D8FFBB] border border-[#3A5B22] rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#1E293B] mb-1">Profile Picture</h2>
            <p className="text-sm text-[#475569] mb-6">Upload a new photo. Recommended size: 200×200px.</p>
            
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full border-2 border-white overflow-hidden bg-gray-200">
                   {/* Replace with actual user image variable */}
                  <img src="https://i.pravatar.cc/150?u=john" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <span className="font-bold text-[#1E293B]">Current Picture</span>
              </div>
              
              <div className="flex gap-3">
                <button className="bg-white text-[#1E293B] px-4 py-2 rounded-lg font-semibold text-sm border border-gray-200 hover:bg-gray-50 transition-colors">
                  Upload New Picture
                </button>
                <button className="bg-[#FCA5A5] text-[#991B1B] px-4 py-2 rounded-lg font-semibold text-sm hover:bg-red-200 transition-colors">
                  Remove
                </button>
              </div>
            </div>
          </section>

          {/* Section 2: Personal Information */}
          <section className="bg-[#D8FFBB] border border-[#3A5B22] rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#1E293B] mb-6">Personal Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#3A5B22] uppercase">First Name</label>
                <input type="text" defaultValue="John" className="w-full p-3 rounded-lg border border-white/50 bg-white/80 focus:ring-2 focus:ring-[#3A5B22] outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#3A5B22] uppercase">Last Name</label>
                <input type="text" defaultValue="Doe" className="w-full p-3 rounded-lg border border-white/50 bg-white/80 focus:ring-2 focus:ring-[#3A5B22] outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#3A5B22] uppercase">Email Address</label>
                <input type="email" defaultValue="john.doe@example.com" className="w-full p-3 rounded-lg border border-white/50 bg-white/80 focus:ring-2 focus:ring-[#3A5B22] outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#3A5B22] uppercase">Phone Number</label>
                <input type="text" defaultValue="555-123-4567" className="w-full p-3 rounded-lg border border-white/50 bg-white/80 focus:ring-2 focus:ring-[#3A5B22] outline-none" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-[#3A5B22] uppercase">Bio</label>
                <textarea 
                  placeholder="e.g., Experienced handyman with a passion for home repairs..." 
                  rows="4"
                  className="w-full p-3 rounded-lg border border-white/50 bg-white/80 focus:ring-2 focus:ring-[#3A5B22] outline-none resize-none"
                ></textarea>
              </div>
            </div>
          </section>

          {/* Section 3: Change Password */}
          <section className="bg-[#D8FFBB] border border-[#3A5B22] rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#1E293B] mb-6">Change Password</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <PasswordField label="Current Password" show={showPasswords.current} onToggle={() => togglePassword('current')} />
              <PasswordField label="New Password" show={showPasswords.new} onToggle={() => togglePassword('new')} />
              <PasswordField label="Confirm New Password" show={showPasswords.confirm} onToggle={() => togglePassword('confirm')} />
            </div>
          </section>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-4">
            <button className="px-8 py-2.5 rounded-lg font-bold text-[#1E293B] bg-white border border-gray-200 hover:bg-gray-50">
              Cancel
            </button>
            <button className="px-8 py-2.5 rounded-lg font-bold text-white bg-[#3A5B22] hover:bg-[#2d461a] shadow-md">
              Save Changes
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

// Sub-component for password inputs to keep code clean
const PasswordField = ({ label, show, onToggle }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-[#3A5B22] uppercase">{label}</label>
    <div className="relative">
      <input 
        type={show ? "text" : "password"} 
        className="w-full p-3 pr-10 rounded-lg border border-white/50 bg-white/80 focus:ring-2 focus:ring-[#3A5B22] outline-none" 
      />
      <button 
        type="button"
        onClick={onToggle}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  </div>
);

export default ProfileSettings;