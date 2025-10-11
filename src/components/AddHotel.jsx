import React, { useEffect, useState } from "react";
import { useUserStore } from "../stores/useUserStore";
import { useRoomStore } from "../stores/useRoomStore";

const amenitiesOptions = [
  "Free Wi-Fi",
  "Swimming Pool",
  "Air Conditioning",
  "Ocean View Balcony",
  "Gym",
  "Hot Tub",
  "Spa",
  "Restaurant",
  "Bar",
  "All Inclusive meals",
  "Parking",
];

const AddHotel = () => {
  const { getAllVendors, vendors } = useUserStore();
  const { createNewHotel } = useRoomStore();

  const [selectedVendor, setSelectedVendor] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [images, setImages] = useState([{ file: null, isPrimary: true }]);
  const [submitting, setSubmitting] = useState(false);

  const [hotelData, setHotelData] = useState({
    name: "",
    description: "",
    location: { address: "", city: "", state: "", country: "", zipCode: "" },
    contact: { phone: "", email: "", website: "" },
    policies: {
      checkInTime: "",
      checkOutTime: "",
      cancellationPolicy: "moderate", // free | moderate | strict
      petPolicy: false,
      childPolicy: "",
      specialNotes: "",
    },
    paymentOptions: { payAtHotel: true, onlinePayment: true },
    status: "pending", // pending | approved | rejected | suspended
  });

  useEffect(() => {
    getAllVendors();
  }, []);

  const handleAmenityChange = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

  const handleImageChange = async (index, file) => {
    if (!file) return;
    const base64 = await convertToBase64(file);
    setImages((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], file: base64 };
      return copy;
    });
  };

  const addMoreImage = () => setImages((prev) => [...prev, { file: null, isPrimary: false }]);

  const removeImage = (index) =>
    setImages((prev) => prev.filter((_, i) => i !== index).map((img, i) => ({ ...img, isPrimary: i === 0 && prev[0]?.isPrimary })));

  const setPrimaryImage = (index) =>
    setImages((prev) => prev.map((img, i) => ({ ...img, isPrimary: i === index })));

  const handleSubmit = async (e) => {
    e.preventDefault();

    // basic validation
    if (!selectedVendor) {
      alert("Please select a vendor.");
      return;
    }
    if (!hotelData.name.trim()) {
      alert("Please enter hotel name.");
      return;
    }

    
    const payload = {
      vendorId: selectedVendor,
      name: hotelData.name,
      description: hotelData.description,
      location: hotelData.location,
      contact: hotelData.contact,
      amenities: selectedAmenities,
      policies: {
        checkInTime: hotelData.policies.checkInTime,
        checkOutTime: hotelData.policies.checkOutTime,
        cancellationPolicy: hotelData.policies.cancellationPolicy,
        petPolicy: hotelData.policies.petPolicy,
        childPolicy: hotelData.policies.childPolicy,
        specialNotes: hotelData.policies.specialNotes,
      },
      paymentOptions: {
        payAtHotel: !!hotelData.paymentOptions.payAtHotel,
        onlinePayment: !!hotelData.paymentOptions.onlinePayment,
      },
      status: hotelData.status,
      images: images
        .filter((img) => img.file) // only send filled images
        .map((img) => ({ file: img.file, isPrimary: !!img.isPrimary })),
    };

    try {
      setSubmitting(true);
      await createNewHotel(payload);
      alert("✅ Hotel created successfully");
      // optional: reset form
      setSelectedVendor("");
      setSelectedAmenities([]);
      setImages([{ file: null, isPrimary: true }]);
      setHotelData({
        name: "",
        description: "",
        location: { address: "", city: "", state: "", country: "", zipCode: "" },
        contact: { phone: "", email: "", website: "" },
        policies: {
          checkInTime: "",
          checkOutTime: "",
          cancellationPolicy: "moderate",
          petPolicy: false,
          childPolicy: "",
          specialNotes: "",
        },
        paymentOptions: { payAtHotel: true, onlinePayment: true },
        status: "pending",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to create hotel. Check console.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto bg-gray-50 rounded-2xl shadow-md p-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Add New Hotel</h2>

      {/* Vendor */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Vendor</label>
        <select
          value={selectedVendor}
          onChange={(e) => setSelectedVendor(e.target.value)}
          className="w-full rounded-lg border-2 border-gray-300 p-3 text-base focus:border-red-500"
        >
          <option value="">-- Choose a Vendor --</option>
          {vendors.map((v) => (
            <option key={v._id} value={v._id}>
              {v.name}
            </option>
          ))}
        </select>
      </div>

      {/* Basic */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Hotel Name *</label>
          <input
            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-red-500"
            value={hotelData.name}
            onChange={(e) => setHotelData({ ...hotelData, name: e.target.value })}
            placeholder="Enter hotel name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={hotelData.status}
            onChange={(e) => setHotelData({ ...hotelData, status: e.target.value })}
            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-red-500"
          >
            <option value="pending">pending</option>
            <option value="approved">approved</option>
            <option value="rejected">rejected</option>
            <option value="suspended">suspended</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            rows={4}
            value={hotelData.description}
            onChange={(e) => setHotelData({ ...hotelData, description: e.target.value })}
            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-red-500"
            placeholder="Short description of the hotel"
          />
        </div>
      </div>

      {/* Location */}
      <h4 className="mt-6 mb-2 font-semibold text-gray-800">Location</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          placeholder="Address"
          value={hotelData.location.address}
          onChange={(e) => setHotelData({ ...hotelData, location: { ...hotelData.location, address: e.target.value } })}
          className="p-3 rounded-lg border-2 border-gray-300 focus:border-red-500"
        />
        <input
          placeholder="City"
          value={hotelData.location.city}
          onChange={(e) => setHotelData({ ...hotelData, location: { ...hotelData.location, city: e.target.value } })}
          className="p-3 rounded-lg border-2 border-gray-300 focus:border-red-500"
        />
        <input
          placeholder="State"
          value={hotelData.location.state}
          onChange={(e) => setHotelData({ ...hotelData, location: { ...hotelData.location, state: e.target.value } })}
          className="p-3 rounded-lg border-2 border-gray-300 focus:border-red-500"
        />
        <input
          placeholder="Country"
          value={hotelData.location.country}
          onChange={(e) => setHotelData({ ...hotelData, location: { ...hotelData.location, country: e.target.value } })}
          className="p-3 rounded-lg border-2 border-gray-300 focus:border-red-500"
        />
        <input
          placeholder="Zip Code"
          value={hotelData.location.zipCode}
          onChange={(e) => setHotelData({ ...hotelData, location: { ...hotelData.location, zipCode: e.target.value } })}
          className="p-3 rounded-lg border-2 border-gray-300 focus:border-red-500"
        />
      </div>

      {/* Contact */}
      <h4 className="mt-6 mb-2 font-semibold text-gray-800">Contact</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          placeholder="Phone"
          value={hotelData.contact.phone}
          onChange={(e) => setHotelData({ ...hotelData, contact: { ...hotelData.contact, phone: e.target.value } })}
          className="p-3 rounded-lg border-2 border-gray-300 focus:border-red-500"
        />
        <input
          placeholder="Email"
          value={hotelData.contact.email}
          onChange={(e) => setHotelData({ ...hotelData, contact: { ...hotelData.contact, email: e.target.value } })}
          className="p-3 rounded-lg border-2 border-gray-300 focus:border-red-500"
        />
        <input
          placeholder="Website"
          value={hotelData.contact.website}
          onChange={(e) => setHotelData({ ...hotelData, contact: { ...hotelData.contact, website: e.target.value } })}
          className="p-3 rounded-lg border-2 border-gray-300 focus:border-red-500"
        />
      </div>

      {/* Amenities */}
      <h4 className="mt-6 mb-2 font-semibold text-gray-800">Amenities</h4>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {amenitiesOptions.map((a) => (
          <label key={a} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedAmenities.includes(a)}
              onChange={() => handleAmenityChange(a)}
              className="h-5 w-5 text-red-500"
            />
            <span className="text-sm text-gray-700">{a}</span>
          </label>
        ))}
      </div>

      {/* Policies */}
      <h4 className="mt-6 mb-2 font-semibold text-gray-800">Policies</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          placeholder="Check-in Time (e.g., 2:00 PM)"
          value={hotelData.policies.checkInTime}
          onChange={(e) => setHotelData({ ...hotelData, policies: { ...hotelData.policies, checkInTime: e.target.value } })}
          className="p-3 rounded-lg border-2 border-gray-300 focus:border-red-500"
        />
        <input
          placeholder="Check-out Time (e.g., 11:00 AM)"
          value={hotelData.policies.checkOutTime}
          onChange={(e) => setHotelData({ ...hotelData, policies: { ...hotelData.policies, checkOutTime: e.target.value } })}
          className="p-3 rounded-lg border-2 border-gray-300 focus:border-red-500"
        />
        <select
          value={hotelData.policies.cancellationPolicy}
          onChange={(e) => setHotelData({ ...hotelData, policies: { ...hotelData.policies, cancellationPolicy: e.target.value } })}
          className="p-3 rounded-lg border-2 border-gray-300 focus:border-red-500"
        >
          <option value="free">Free</option>
          <option value="moderate">Moderate</option>
          <option value="strict">Strict</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={hotelData.policies.petPolicy}
            onChange={(e) => setHotelData({ ...hotelData, policies: { ...hotelData.policies, petPolicy: e.target.checked } })}
            className="h-5 w-5"
          />
          <span className="text-sm text-gray-700">Pets Allowed</span>
        </label>

        <input
          placeholder="Child Policy (e.g., Children under 12 stay free)"
          value={hotelData.policies.childPolicy}
          onChange={(e) => setHotelData({ ...hotelData, policies: { ...hotelData.policies, childPolicy: e.target.value } })}
          className="p-3 rounded-lg border-2 border-gray-300 focus:border-red-500"
        />
      </div>

      <textarea
        placeholder="Special Notes"
        value={hotelData.policies.specialNotes}
        onChange={(e) => setHotelData({ ...hotelData, policies: { ...hotelData.policies, specialNotes: e.target.value } })}
        className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-red-500 mt-4"
        rows={3}
      />

      {/* Images */}
      <h4 className="mt-6 mb-2 font-semibold text-gray-800">Images</h4>
      {images.map((img, idx) => (
        <div key={idx} className="flex gap-3 items-center mb-3">
          <input
            accept="image/*"
            type="file"
            onChange={(e) => handleImageChange(idx, e.target.files[0])}
            className="flex-1 p-2 rounded-lg border-2 border-gray-300"
          />
          <label className="flex items-center gap-2">
            <input type="radio" checked={img.isPrimary} onChange={() => setPrimaryImage(idx)} />
            <span className="text-sm">Primary</span>
          </label>
          {images.length > 1 && (
            <button type="button" onClick={() => removeImage(idx)} className="text-sm text-red-600">
              Remove
            </button>
          )}
        </div>
      ))}
      <div className="mb-4">
        <button type="button" onClick={addMoreImage} className="px-3 py-2 bg-gray-200 rounded-lg">
          + Add more image
        </button>
      </div>

      {/* Payment options */}
      <h4 className="mt-4 mb-2 font-semibold text-gray-800">Payment Options</h4>
      <div className="flex gap-6 items-center">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={hotelData.paymentOptions.payAtHotel}
            onChange={(e) => setHotelData({ ...hotelData, paymentOptions: { ...hotelData.paymentOptions, payAtHotel: e.target.checked } })}
            className="h-5 w-5"
          />
          <span>Pay at Hotel</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={hotelData.paymentOptions.onlinePayment}
            onChange={(e) => setHotelData({ ...hotelData, paymentOptions: { ...hotelData.paymentOptions, onlinePayment: e.target.checked } })}
            className="h-5 w-5"
          />
          <span>Online Payment</span>
        </label>
      </div>

      {/* Submit */}
      <div className="mt-6 text-center">
        <button
          type="submit"
          disabled={submitting}
          className="px-8 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 disabled:opacity-60"
        >
          {submitting ? "Creating..." : "Add Hotel"}
        </button>
      </div>
    </form>
  );
};

export default AddHotel;
