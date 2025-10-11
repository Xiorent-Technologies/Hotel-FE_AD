import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserStore } from "../stores/useUserStore";

const SettingProfile = () => {
  const { user, getUser, updateUser } = useUserStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    phone: "",
    bio: "",
    image: "",
  });
  const [preview, setPreview] = useState(""); // Image preview
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Load user data when component mounts
  useEffect(() => {
    if (!user) {
      getUser().catch((err) => console.warn("Could not fetch user:", err));
    }
  }, [user, getUser]);

  // ✅ Populate form when user is loaded
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        username: user.username || "",
        phone: user.phone || "",
        bio: user.bio || "",
        image: user.image || "",
      });
      setPreview(user.image || "");
    }
  }, [user]);

  // ✅ Handle text input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Handle image upload (convert to Base64 before sending)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        image: reader.result, // base64 string
      }));
      setPreview(reader.result);
    };
  };

  // ✅ Handle form submission
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const id = user?._id || user?.id;
      if (!id) throw new Error("User ID not found. Please login again.");

      await updateUser(id, formData);
      toast.success("✅ Profile updated successfully!");

      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      console.error("❌ Update failed:", err);
      const msg = err?.response?.data?.message || err.message || "Update failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Reset form to original user data
  const handleReset = () => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        username: user.username || "",
        phone: user.phone || "",
        bio: user.bio || "",
        image: user.image || "",
      });
      setPreview(user.image || "");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex justify-center items-start p-6">
      <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h2>
        <ToastContainer />

        <form onSubmit={handleUpdateProfile} className="space-y-6">
          {/* ✅ Profile Photo Upload */}
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
            <label className="relative w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-red-400 rounded-lg bg-red-50 cursor-pointer hover:bg-red-100 transition overflow-hidden">
              {preview ? (
                <img
                  src={preview}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <p className="text-xs text-gray-600 mt-1 text-center">
                    Upload your photo
                  </p>
                </>
              )}

              {/* Hidden File Input */}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            {/* Remove Image Button */}
            {preview && (
              <button
                type="button"
                onClick={() => {
                  setPreview("");
                  setFormData((prev) => ({ ...prev, image: "" }));
                }}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm px-4 py-2 rounded-lg"
              >
                Remove
              </button>
            )}
          </div>

          {/* ✅ Profile Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-400"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-400"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-400"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-400"
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          {/* ✅ Bio */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border rounded-lg resize-none focus:ring-2 focus:ring-red-400"
              placeholder="Write a short bio about yourself..."
            ></textarea>
          </div>

          {/* ✅ Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors w-full sm:w-auto"
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-8 py-3 rounded-lg transition-colors w-full sm:w-auto"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingProfile;