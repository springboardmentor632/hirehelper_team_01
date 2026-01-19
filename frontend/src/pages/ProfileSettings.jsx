import React from "react";
import { Eye, EyeOff } from "lucide-react";
import { 
  getUserProfile, 
  updateUserProfile, 
  updateProfilePictureAndBio, 
  removeProfilePicture 
} from "../utils/api.js";
import DeleteAccountButton from "../components/DeleteAccountButton.jsx"

const ProfileSettings = () => {
  const [showPasswords, setShowPasswords] = React.useState({ 
    current: false, 
    new: false, 
    confirm: false 
  });
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [imageFile, setImageFile] = React.useState(null);

  // Fetch user profile on component mount
  React.useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const profile = await getUserProfile();
        setUser(profile);
      } catch (err) {
        setError("Failed to load profile");
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const togglePassword = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleInput = (key, value) => {
    setUser(prev => ({ ...prev, [key]: value }));
    setError("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB");
      return;
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      setError("Only image files (JPEG, PNG, GIF) are allowed");
      return;
    }

    setImageFile(file);

    // Show preview
    const reader = new FileReader();
    reader.onload = () => {
      setUser(prev => ({ ...prev, profile_picture: reader.result }));
    };
    reader.readAsDataURL(file);
    setError("");
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      // If there's an image file or bio change, use the multipart endpoint
      if (imageFile || user.bio !== (await getUserProfile()).bio) {
        const formData = new FormData();
        
        if (imageFile) {
          formData.append("profile_picture", imageFile);
        }
        
        if (user.bio !== undefined) {
          formData.append("bio", user.bio || "");
        }

        const updatedUser = await updateProfilePictureAndBio(formData);
        setUser(updatedUser);
        setImageFile(null);
        
        // Update localStorage with new profile
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setSuccess("Profile picture and bio saved successfully!");
      }

      // Update basic profile info if changed
      const profileUpdates = {};
      if (user.first_name !== undefined) profileUpdates.first_name = user.first_name;
      if (user.last_name !== undefined) profileUpdates.last_name = user.last_name;
      if (user.email_id !== undefined) profileUpdates.email_id = user.email_id;
      if (user.phone_number !== undefined) profileUpdates.phone_number = user.phone_number;

      if (Object.keys(profileUpdates).length > 0) {
        const updatedUser = await updateUserProfile(profileUpdates);
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setSuccess("Profile updated successfully!");
      }

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to save profile");
      console.error("Error saving profile:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleRemovePicture = async () => {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const updatedUser = await removeProfilePicture();
      setUser(updatedUser);
      setImageFile(null);
      
      // Update localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setSuccess("Profile picture removed successfully!");
      
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to remove profile picture");
      console.error("Error removing profile picture:", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 lg:p-10 bg-transparent flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3D5A26] mx-auto"></div>
          <p className="mt-4 text-[#5C7A44]">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10 bg-transparent">
      <div className="max-w-5xl space-y-6">
        
        {/* Error Alert */}
        {error && (
          <div className="bg-[#FFD9D9] border border-[#E85050] text-[#B91C1C] rounded-lg p-4">
            {error}
          </div>
        )}

        {/* Success Alert */}
        {success && (
          <div className="bg-[#D9FFC1] border border-[#A8E085] text-[#3A5B22] rounded-lg p-4">
            {success}
          </div>
        )}
        
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
                <label className="bg-white text-[#1E293B] px-4 py-2 rounded-lg font-bold text-sm border border-gray-100 shadow-sm cursor-pointer hover:bg-gray-50 disabled:opacity-50" disabled={saving}>
                  Upload New Picture
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" disabled={saving} />
                </label>
                <button 
                  onClick={handleRemovePicture} 
                  className="bg-[#FFD9D9] text-[#B91C1C] px-4 py-2 rounded-lg font-bold text-sm hover:bg-[#FFB3B3] disabled:opacity-50"
                  disabled={saving || !user.profile_picture}
                >
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
                disabled={saving}
                className="w-full p-3 rounded-lg border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-[#3A5B22]/20 disabled:opacity-50" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#3A5B22]">Last Name</label>
              <input 
                type="text" 
                value={user.last_name || ''}
                onChange={(e) => handleInput('last_name', e.target.value)}
                disabled={saving}
                className="w-full p-3 rounded-lg border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-[#3A5B22]/20 disabled:opacity-50" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#3A5B22]">Email Address</label>
              <input 
                type="email" 
                value={user.email_id || ''}
                onChange={(e) => handleInput('email_id', e.target.value)}
                disabled={saving}
                className="w-full p-3 rounded-lg border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-[#3A5B22]/20 disabled:opacity-50" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#3A5B22]">Phone Number</label>
              <input 
                type="text" 
                value={user.phone_number || ''}
                onChange={(e) => handleInput('phone_number', e.target.value)}
                disabled={saving}
                className="w-full p-3 rounded-lg border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-[#3A5B22]/20 disabled:opacity-50" 
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#3A5B22]">Bio</label>
            <textarea 
              placeholder="e.g., Experienced handyman with a passion for home repairs..."
              value={user.bio || ''}
              onChange={(e) => handleInput('bio', e.target.value)}
              disabled={saving}
              className="w-full p-3 h-32 rounded-lg border border-gray-200 bg-white outline-none resize-none focus:ring-2 focus:ring-[#3A5B22]/20 disabled:opacity-50"
            ></textarea>
          </div>
        </section>

       

        {/* Footer Actions */}
        <div className="flex justify-end gap-4 pt-4 pb-10">
          <button 
            className="px-8 py-2.5 rounded-lg font-bold text-[#1E293B] bg-[#F1F5F9] border border-gray-100 shadow-sm transition-colors hover:bg-white disabled:opacity-50"
            disabled={saving}
          >
            Cancel
          </button>
          <button 
            onClick={handleSave} 
            className="px-8 py-2.5 rounded-lg font-bold text-white bg-[#3D5A26] shadow-md transition-colors hover:bg-[#2A3F1A] disabled:opacity-50"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <DeleteAccountButton></DeleteAccountButton>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;