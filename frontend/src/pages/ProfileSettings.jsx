import React from "react";
import { Eye, EyeOff } from "lucide-react";

const ProfileSettings = () => {
  const [showPasswords, setShowPasswords] = React.useState({ 
    current: false, 
    new: false, 
    confirm: false 
  });
  const [user, setUser] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem('user') || '{}'); } catch { return {}; }
  });

  const togglePassword = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleInput = (key, value) => setUser(prev => ({ ...prev, [key]: value }));

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      handleInput('profile_picture', reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    try {
      // Save to localStorage as a placeholder until backend update API is available
      localStorage.setItem('user', JSON.stringify(user));
      alert('Profile saved locally. Server sync will happen if backend endpoint is available.');
    } catch (e) {
      alert('Failed to save profile');
    }
  };

  const handleRemovePicture = () => handleInput('profile_picture', '');

  return (
    <div className="p-6 lg:p-10 bg-transparent">
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
                  src={user.profile_picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.first_name || 'User'}` } 
                  alt="Profile" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <span className="font-bold text-[#1E293B] text-lg">Current Picture</span>
            </div>
            <div className="flex gap-3">
              <div className="flex gap-3">
                <label className="bg-white text-[#1E293B] px-4 py-2 rounded-lg font-bold text-sm border border-gray-100 shadow-sm cursor-pointer">
                  Upload New Picture
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
                <button onClick={handleRemovePicture} className="bg-[#FFD9D9] text-[#B91C1C] px-4 py-2 rounded-lg font-bold text-sm">
                  Remove
                </button>
              </div>
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
                value={user.first_name || ''}
                onChange={(e) => handleInput('first_name', e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-[#3A5B22]/20" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#3A5B22]">Last Name</label>
              <input 
                type="text" 
                value={user.last_name || ''}
                onChange={(e) => handleInput('last_name', e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-[#3A5B22]/20" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#3A5B22]">Email Address</label>
              <input 
                type="email" 
                value={user.email_id || ''}
                onChange={(e) => handleInput('email_id', e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-[#3A5B22]/20" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#3A5B22]">Phone Number</label>
              <input 
                type="text" 
                value={user.phone_number || ''}
                onChange={(e) => handleInput('phone_number', e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-[#3A5B22]/20" 
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#3A5B22]">Bio</label>
            <textarea 
              placeholder="e.g., Experienced handyman with a passion for home repairs..."
              value={user.bio || ''}
              onChange={(e) => handleInput('bio', e.target.value)}
              className="w-full p-3 h-32 rounded-lg border border-gray-200 bg-white outline-none resize-none focus:ring-2 focus:ring-[#3A5B22]/20"
            ></textarea>
          </div>
        </section>

       

        {/* Footer Actions */}
        <div className="flex justify-end gap-4 pt-4 pb-10">
          <button className="px-8 py-2.5 rounded-lg font-bold text-[#1E293B] bg-[#F1F5F9] border border-gray-100 shadow-sm transition-colors hover:bg-white">
            Cancel
          </button>
          <button onClick={handleSave} className="px-8 py-2.5 rounded-lg font-bold text-white bg-[#3D5A26] shadow-md transition-colors hover:bg-[#2A3F1A]">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;