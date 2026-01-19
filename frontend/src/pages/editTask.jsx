import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar"; // Added Sidebar import

const EditTask = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const token = localStorage.getItem("token");

  // Reusable styles to match your screenshots
  const inputClasses = "w-full p-3 border border-border-default rounded-md text-base text-text-primary focus:outline-none focus:ring-2 focus:ring-action-accept shadow-sm bg-white";
  const labelClasses = "block text-sm font-semibold text-text-primary mb-1";

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(`/api/tasks/${taskId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch task");
        const data = await res.json();
        setTitle(data.title || "");
        setDescription(data.description || "");
        setLocation(data.location || "");
      } catch (err) {
        alert("Failed to load task details");
        navigate("/mytasks");
      } finally {
        setFetching(false);
      }
    };
    fetchTask();
  }, [taskId, token, navigate]);

  const handleUpdate = async () => {
    if (!title.trim() || !description.trim() || !location.trim()) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, location }),
      });

      if (!res.ok) throw new Error("Failed to update task details");

      if (image) {
        const formData = new FormData();
        formData.append("picture", image);
        const imgRes = await fetch(`/api/tasks/${taskId}/image`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
        if (!imgRes.ok) throw new Error("Image upload failed");
      }

      alert("Task updated successfully");
      navigate("/mytasks", { replace: true });
    } catch (err) {
      alert(err.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex bg-bg-app min-h-screen">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center p-10 text-text-secondary">
          Loading task details...
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-bg-app min-h-screen font-sans">
    

      {/* 2. Main Content Area */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">

        {/* 3. Task Form Card (Matches your "Add Task" screenshot UI) */}
        <div className="bg-bg-highlight p-6 md:p-8 rounded-lg border border-action-accept shadow-card max-w-5xl">
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className={labelClasses}>Title *</label>
              <input
                className={inputClasses}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Help Moving Furniture"
              />
            </div>

            {/* Description */}
            <div>
              <label className={labelClasses}>Description *</label>
              <textarea
                className={`${inputClasses} resize-none`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide a detailed description of the task..."
                rows={4}
              />
            </div>

            {/* Location */}
            <div>
              <label className={labelClasses}>Location *</label>
              <input
                className={inputClasses}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Downtown Central, USA"
              />
            </div>

            {/* Image Upload Area */}
            <div>
              <label className={labelClasses}>Image Update (Optional)</label>
              <div className="border-2 border-dashed border-action-accept rounded-lg p-8 text-center bg-white/50 cursor-pointer hover:border-brand-primary transition">
                <input
                  type="file"
                  id="editImage"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="hidden"
                />
                <label htmlFor="editImage" className="block cursor-pointer">
                  <span className="text-3xl text-action-accept mb-2 block">☁️</span>
                  <p className="text-text-secondary text-sm">
                    {image ? (
                      <span className="text-brand-primary font-bold">{image.name}</span>
                    ) : (
                      <>
                        <span className="text-action-link font-semibold hover:underline">Upload a new file</span> or drag and drop
                      </>
                    )}
                  </p>
                  <p className="text-xs text-text-secondary mt-1">PNG, JPG up to 5MB</p>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
               <button
                onClick={() => navigate("/mytasks")}
                className="px-8 py-3 bg-gray-200 text-gray-700 font-bold text-base rounded-md hover:bg-gray-300 transition shadow-sm order-2 sm:order-1"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={loading}
                className="px-8 py-3 bg-action-accept text-action-decline font-bold text-base rounded-md hover:opacity-90 transition shadow-md disabled:opacity-60 order-1 sm:order-2"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditTask;