import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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

  // ================= FETCH TASK =================
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(`/api/tasks/${taskId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch task");
        }

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

  // ================= UPDATE TASK =================
  const handleUpdate = async () => {
    if (!title.trim() || !description.trim() || !location.trim()) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Update task details
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          location,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update task details");
      }

      // 2️⃣ Update image (if selected)
      if (image) {
        const formData = new FormData();
        formData.append("picture", image);

        const imgRes = await fetch(`/api/tasks/${taskId}/image`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!imgRes.ok) {
          throw new Error("Image upload failed");
        }
      }

      alert("Task updated successfully");

      // IMPORTANT: force refresh of MyTasks
      navigate("/mytasks", { replace: true });
    } catch (err) {
      alert(err.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= LOADING STATE =================
  if (fetching) {
    return (
      <div className="p-10 text-center text-text-secondary">
        Loading task details...
      </div>
    );
  }

  // ================= UI =================
  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Update Task</h2>

      <input
        className="w-full border p-2 mb-3 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />

      <textarea
        className="w-full border p-2 mb-3 rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        rows={4}
      />

      <input
        className="w-full border p-2 mb-3 rounded"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="mb-4"
      />

      <button
        onClick={handleUpdate}
        disabled={loading}
        className="w-full bg-action-accept text-white py-2 rounded hover:brightness-95 disabled:opacity-60"
      >
        {loading ? "Updating..." : "Save Changes"}
      </button>
    </div>
  );
};

export default EditTask;
