import React from "react";
import { Eye, EyeOff } from "lucide-react";

const ProfileSettings = () => {
  const [showPasswords, setShowPasswords] = React.useState({ current: false, new: false, confirm: false });

  const togglePassword = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
      <div className="p-6 lg:p-10">
        <h1 className="text-3xl font-extrabold text-[#1E293B] mb-8">Profile & Account Settings</h1>

        <div className="max-w-5xl space-y-6">
          {/* Section 1: Profile Picture */}
          <section className="bg-[#D8FFBB] border border-[#3A5B22] rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#1E293B] mb-1">Profile Picture</h2>
            <p className="text-sm text-[#475569] mb-6">Upload a new photo. Recommended size: 200×200px.</p>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full border-2 border-white overflow-hidden bg-gray-200">
                  <img src="https://i.pravatar.cc/150?u=john" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <span className="font-bold text-[#1E293B]">Current Picture</span>
              </div>
              <div className="flex gap-3">
                <button className="bg-white text-[#1E293B] px-4 py-2 rounded-lg font-semibold text-sm border border-gray-200">Upload New</button>
                <button className="bg-[#FCA5A5] text-[#991B1B] px-4 py-2 rounded-lg font-semibold text-sm">Remove</button>
              </div>
            </div>
          </section>

          {/* Section 2: Personal Information */}
          <section className="bg-[#D8FFBB] border border-[#3A5B22] rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#1E293B] mb-6">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#3A5B22] uppercase">First Name</label>
                <input type="text" defaultValue="John" className="w-full p-3 rounded-lg border border-white/50 bg-white/80 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#3A5B22] uppercase">Last Name</label>
                <input type="text" defaultValue="Doe" className="w-full p-3 rounded-lg border border-white/50 bg-white/80 outline-none" />
              </div>
            </div>
          </section>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-4">
            <button className="px-8 py-2.5 rounded-lg font-bold text-[#1E293B] bg-white border border-gray-200">Cancel</button>
            <button className="px-8 py-2.5 rounded-lg font-bold text-white bg-[#3A5B22] shadow-md">Save Changes</button>
          </div>
        </div>
      </div>
  );
};

export default ProfileSettings;