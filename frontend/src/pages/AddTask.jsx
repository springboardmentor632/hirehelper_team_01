import React, { useState } from "react";
import { createTask } from "../utils/api";

const AddTask = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) setSelectedFile(e.dataTransfer.files[0]);
  };
  const handleDragOver = (e) => e.preventDefault();

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    try {
      if (!title || !description || !location || !startTime) return alert("Please fill required fields");

      setLoading(true);
      const form = new FormData();
      form.append("title", title);
      form.append("description", description);
      form.append("location", location);
      form.append("start_time", startTime);
      if (endTime) form.append("end_time", endTime);
      form.append("status", "1");
      if (selectedFile) form.append("picture", selectedFile);

      await createTask(form);
      alert("Task posted successfully");
      window.location.href = "/mytasks";
    } catch (err) {
      setLoading(false);
      alert(err.message || "Failed to create task");
    }
  };

  return (
    <div className="p-6 sm:p-10 space-y-6">
        

        <form onSubmit={handleSubmit} className="bg-[#D8FFBB] border border-[#3A5B22] rounded-xl p-6 sm:p-8 w-full space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#3F3F46] mb-1">Title <span className="text-red-500">*</span></label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Help Moving Furniture" className="w-full h-[50px] px-4 rounded-lg border border-[#D4D4D8]" />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#3F3F46] mb-1">Description <span className="text-red-500">*</span></label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="4" placeholder="Provide a detailed description of the task..." className="w-full px-4 py-3 rounded-lg border border-[#D4D4D8]" />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#3F3F46] mb-1">Location <span className="text-red-500">*</span></label>
            <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Downtown Central, USA" className="w-full h-[50px] px-4 rounded-lg border border-[#D4D4D8]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-medium text-[#3F3F46] mb-1">Start Date/Time <span className="text-red-500">*</span></label>
                <input value={startTime} onChange={(e) => setStartTime(e.target.value)} type="datetime-local" className="w-full h-[50px] px-4 rounded-lg border border-[#D4D4D8]" />
            </div>
            <div>
                <label className="block text-sm font-medium text-[#3F3F46] mb-1">End Date/Time (Optional)</label>
                <input value={endTime} onChange={(e) => setEndTime(e.target.value)} type="datetime-local" className="w-full h-[50px] px-4 rounded-lg border border-[#D4D4D8]" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#3F3F46] mb-2">Image Upload</label>
            <input type="file" id="fileUpload" accept="image/png, image/jpeg" onChange={handleFileChange} className="hidden" />
            <div className="border-2 border-dashed border-[#3A5B22] rounded-lg p-8 text-center bg-[#E6FFD4] cursor-pointer" onClick={() => document.getElementById('fileUpload').click()} onDrop={handleDrop} onDragOver={handleDragOver}>
              <p className="text-[#52525B] mb-2">{selectedFile ? selectedFile.name : 'Upload a file or drag and drop'}</p>
              <button type="button" className="px-4 py-2 bg-white border border-[#3A5B22] rounded-md text-[#3A5B22] font-medium">Browse</button>
            </div>
          </div>

          <div className="flex justify-end">
            <button type="submit" disabled={loading} className="h-[50px] px-6 bg-[#3A5B22] text-white rounded-lg font-semibold disabled:opacity-50">
              {loading ? 'Posting...' : 'Post Task'}
            </button>
          </div>
        </form>
    </div>
  );
};

export default AddTask;