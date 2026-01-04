import React from "react";
import { Eye, EyeOff } from "lucide-react";

const ProfileSettings = () => {
  const [showPasswords, setShowPasswords] = React.useState({ 
    current: false, 
    new: false, 
    confirm: false 
  });

  const togglePassword = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="p-6 lg:p-10 bg-transparent">
      {/* Title directly from the image */}
      <h1 className="text-3xl font-extrabold text-[#1E293B] mb-8">
        Profile & Account Settings
      </h1>

      <div className="max-w-5xl space-y-6">
        
        {/* Section 1: Profile Picture */}
        <section className="bg-[#D9FFC1] border border-[#A8E085] rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#1E293B] mb-1">Profile Picture</h2>
          <p className="text-sm text-[#5C7A44] mb-6">
            Upload a new photo. Recommended size: 200×200px.
          </p>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-sm bg-white">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" 
                  alt="Profile" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <span className="font-bold text-[#1E293B] text-lg">Current Picture</span>
            </div>
            <div className="flex gap-3">
              <button className="bg-white text-[#1E293B] px-4 py-2 rounded-lg font-bold text-sm border border-gray-100 shadow-sm">
                Upload New Picture
              </button>
              <button className="bg-[#FFD9D9] text-[#B91C1C] px-4 py-2 rounded-lg font-bold text-sm">
                Remove
              </button>
            </div>
          </div>
        </section>

        {/* Section 2: Personal Information */}
        <section className="bg-[#D9FFC1] border border-[#A8E085] rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#1E293B] mb-6">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#3A5B22]">First Name</label>
              <input 
                type="text" 
                defaultValue="John" 
                className="w-full p-3 rounded-lg border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-[#3A5B22]/20" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#3A5B22]">Last Name</label>
              <input 
                type="text" 
                defaultValue="Doe" 
                className="w-full p-3 rounded-lg border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-[#3A5B22]/20" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#3A5B22]">Email Address</label>
              <input 
                type="email" 
                defaultValue="john.doe@example.com" 
                className="w-full p-3 rounded-lg border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-[#3A5B22]/20" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#3A5B22]">Phone Number</label>
              <input 
                type="text" 
                defaultValue="555-123-4567" 
                className="w-full p-3 rounded-lg border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-[#3A5B22]/20" 
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#3A5B22]">Bio</label>
            <textarea 
              placeholder="e.g., Experienced handyman with a passion for home repairs..."
              className="w-full p-3 h-32 rounded-lg border border-gray-200 bg-white outline-none resize-none focus:ring-2 focus:ring-[#3A5B22]/20"
            ></textarea>
          </div>
        </section>

        {/* Section 3: Change Password */}
        <section className="bg-[#D9FFC1] border border-[#A8E085] rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#1E293B] mb-6">Change Password</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['current', 'new', 'confirm'].map((field) => (
              <div key={field} className="space-y-2">
                <label className="text-xs font-bold text-[#3A5B22] capitalize">
                  {field === 'confirm' ? 'Confirm New Password' : `${field} Password`}
                </label>
                <div className="relative">
                  <input 
                    type={showPasswords[field] ? "text" : "password"}
                    className="w-full p-3 pr-10 rounded-lg border border-gray-200 bg-white outline-none" 
                  />
                  <button 
                    type="button"
                    onClick={() => togglePassword(field)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswords[field] ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Actions */}
        <div className="flex justify-end gap-4 pt-4 pb-10">
          <button className="px-8 py-2.5 rounded-lg font-bold text-[#1E293B] bg-[#F1F5F9] border border-gray-100 shadow-sm transition-colors hover:bg-white">
            Cancel
          </button>
          <button className="px-8 py-2.5 rounded-lg font-bold text-white bg-[#3D5A26] shadow-md transition-colors hover:bg-[#2A3F1A]">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;