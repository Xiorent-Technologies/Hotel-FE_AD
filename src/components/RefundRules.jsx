import React, { useState, useEffect } from "react";
import { Pencil, Save, X, RotateCcw } from "lucide-react";

const RefundRules = () => {
  const initialRules = [
    {
      title: "Free Cancellation Window",
      description:
        "Full refund if cancelled within 24 hours of booking (and at least 48 hours before check-in).",
    },
    {
      title: "Before Check-in",
      description:
        "80% refund if cancelled more than 48 hours before check-in.\n50% refund if cancelled within 24–48 hours before check-in.\nNo refund if cancelled within 24 hours of check-in.",
    },
    {
      title: "No-show Policy",
      description:
        "If the guest does not show up without cancellation, no refund will be issued.",
    },
    {
      title: "Early Check-out",
      description:
        "Refund will be processed only for unused nights, subject to hotel policy.",
    },
    {
      title: "Force Majeure / Special Cases",
      description:
        "In case of unavoidable events (natural calamities, government restrictions, medical emergencies), hotels may offer flexible refund or reschedule options.",
    },
    {
      title: "Processing Time",
      description:
        "Refunds will be credited back to the original payment method within 7–10 business days.",
    },
  ];

  // ✅ Load saved rules from localStorage or fall back to default
  const [rules, setRules] = useState(() => {
    const saved = localStorage.getItem("refundRules");
    return saved ? JSON.parse(saved) : initialRules;
  });

  const [editMode, setEditMode] = useState(false);

  // ✅ Automatically sync localStorage whenever rules change
  useEffect(() => {
    localStorage.setItem("refundRules", JSON.stringify(rules));
  }, [rules]);

  // --- Handlers ---
  const handleChange = (index, field, value) => {
    const updated = [...rules];
    updated[index][field] = value;
    setRules(updated);
  };

  const handleSave = () => {
    localStorage.setItem("refundRules", JSON.stringify(rules));
    setEditMode(false);
    alert("✅ Refund rules saved successfully!");
  };

  const handleCancel = () => {
    const saved = localStorage.getItem("refundRules");
    setRules(saved ? JSON.parse(saved) : initialRules);
    setEditMode(false);
  };

  const handleReset = () => {
    localStorage.removeItem("refundRules");
    setRules(initialRules);
    alert("🔄 Rules have been reset to default.");
  };

  // --- JSX ---
  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl p-4 sm:p-6 shadow-md">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-300 pb-3 mb-4">
          <div className="flex items-center space-x-3">
            <h1 className="text-xl sm:text-2xl font-bold text-red-600">
              Our Refund Rules
            </h1>
            <button
              onClick={handleReset}
              className="flex items-center text-gray-500 hover:text-red-500 text-sm"
            >
              <RotateCcw className="w-4 h-4 mr-1" /> Reset
            </button>
          </div>

          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="flex items-center text-red-600 hover:text-red-800 text-sm mt-2 sm:mt-0"
            >
              <Pencil className="w-4 h-4 mr-1" />
              Edit
            </button>
          ) : (
            <div className="flex space-x-2 mt-2 sm:mt-0">
              <button
                onClick={handleSave}
                className="flex items-center bg-green-500 text-white px-3 py-1 rounded-md text-sm hover:bg-green-600"
              >
                <Save className="w-4 h-4 mr-1" /> Save
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center bg-gray-400 text-white px-3 py-1 rounded-md text-sm hover:bg-gray-500"
              >
                <X className="w-4 h-4 mr-1" /> Cancel
              </button>
            </div>
          )}
        </div>

        {/* Rules List */}
        <div className="space-y-6">
          {rules.map((rule, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg shadow-sm">
              {editMode ? (
                <>
                  <input
                    type="text"
                    value={rule.title}
                    onChange={(e) => handleChange(index, "title", e.target.value)}
                    className="w-full font-semibold text-gray-900 text-base sm:text-lg border-b border-gray-300 focus:outline-none focus:border-red-500"
                  />
                  <textarea
                    value={rule.description}
                    onChange={(e) => handleChange(index, "description", e.target.value)}
                    rows="3"
                    className="w-full mt-2 text-sm sm:text-base text-gray-700 border border-gray-300 rounded-md p-2 focus:outline-none focus:border-red-500"
                  />
                </>
              ) : (
                <>
                  <h2 className="font-semibold text-gray-900 text-base sm:text-lg">
                    {index + 1}. {rule.title}
                  </h2>
                  <p className="text-sm sm:text-base mt-1 text-gray-700 whitespace-pre-line">
                    {rule.description}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default RefundRules;