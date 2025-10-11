import React, { useState } from "react";

const roomTypes = [
  "single",
  "double",
  "deluxe",
  "family",
  "Apartments",
  "Guest Houses",
  "Home Stays",
  "Hostels",
  "Boats",
  "Bed and Breakfast",
  "Holiday Homes",
  "Villas",
  "Cottages",
  "Chalets",
  "Farm Stays",
  "Resorts",
  "Timeshares",
  "Luxury Suites",
];

const amenitiesOptions = [
  "Free Wi-Fi",
  "Swimming Pool",
  "Air Conditioning",
  "Ocean View Balcony",
  "Gym",
  "Hot Tub",
  "Spa",
  "Restaurant",
  "Private Pool",
  "Bar",
  "All Inclusive meals",
  "Parking",
];
 
const AddRooms = () => {
  const [roomData, setRoomData] = useState({
    hotelId: "",
    type: "",
    description: "",
    capacity: { adults: 1, children: 0, total: 1 },
    basePrice: "",
    taxRate: 0,
    totalRooms: 1,
    amenities: [],
    cancellationRules: {
      freeCancellationHours: 24,
      cancellationFee: 0,
      nonRefundable: false,
    },
    isActive: true,
  });
  const [images, setImages] = useState([{ file: null }]);

  const handleAmenityChange = (amenity) => {
    setRoomData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleImageChange = async (index, file) => {
    const base64 = await convertToBase64(file);
    const newImages = [...images];
    newImages[index].file = base64;
    setImages(newImages);
  };

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

  const addMoreImage = () => setImages([...images, { file: null }]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Room Data:", { ...roomData, images });
    alert("✅ Room created successfully (dummy test)!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl mx-auto bg-gray-50 shadow-md rounded-2xl p-10"
    >
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Add New Room
      </h2>

      {/* Hotel Selection */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          Select Hotel
        </label>
        <select
          value={roomData.hotelId}
          onChange={(e) =>
            setRoomData({ ...roomData, hotelId: e.target.value })
          }
          className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-red-500 focus:ring-1 focus:ring-red-500"
        >
          <option value="">-- Choose Hotel --</option>
          <option value="hotel1">The Oberoi, Mumbai</option>
          <option value="hotel2">Taj Palace, Delhi</option>
          <option value="hotel3">ITC Gardenia, Bengaluru</option>
        </select>
      </div>

      {/* Room Type & Description */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Type</label>
          <select
            value={roomData.type}
            onChange={(e) => setRoomData({ ...roomData, type: e.target.value })}
            className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-red-500 focus:ring-1 focus:ring-red-500"
          >
            <option value="">-- Select Type --</option>
            {roomTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            placeholder="Room Description"
            value={roomData.description}
            onChange={(e) =>
              setRoomData({ ...roomData, description: e.target.value })
            }
            rows={3}
            className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-red-500 focus:ring-1 focus:ring-red-500"
          />
        </div>
      </div>

      {/* Capacity */}
      <h3 className="text-xl font-semibold mt-10 mb-4 text-gray-800">
        Capacity
      </h3>
      <div className="grid md:grid-cols-3 gap-6">
        {["adults", "children", "total"].map((key) => (
          <div key={key}>
            <label className="block text-gray-700 font-medium mb-2 capitalize">
              {key}
            </label>
            <input
              type="number"
              min="0"
              value={roomData.capacity[key]}
              onChange={(e) =>
                setRoomData({
                  ...roomData,
                  capacity: {
                    ...roomData.capacity,
                    [key]: parseInt(e.target.value),
                  },
                })
              }
              className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </div>
        ))}
      </div>

      {/* Pricing */}
      <h3 className="text-xl font-semibold mt-10 mb-4 text-gray-800">
        Pricing Details
      </h3>
      <div className="grid md:grid-cols-3 gap-6">
        <input
          type="number"
          placeholder="Base Price"
          value={roomData.basePrice}
          onChange={(e) =>
            setRoomData({ ...roomData, basePrice: parseFloat(e.target.value) })
          }
          className="border-2 border-gray-300 rounded-lg p-3 w-full focus:border-red-500 focus:ring-1 focus:ring-red-500"
        />
        <input
          type="number"
          placeholder="Tax Rate (%)"
          value={roomData.taxRate}
          onChange={(e) =>
            setRoomData({ ...roomData, taxRate: parseFloat(e.target.value) })
          }
          className="border-2 border-gray-300 rounded-lg p-3 w-full focus:border-red-500 focus:ring-1 focus:ring-red-500"
        />
        <input
          type="number"
          placeholder="Total Rooms"
          value={roomData.totalRooms}
          onChange={(e) =>
            setRoomData({ ...roomData, totalRooms: parseInt(e.target.value) })
          }
          className="border-2 border-gray-300 rounded-lg p-3 w-full focus:border-red-500 focus:ring-1 focus:ring-red-500"
        />
      </div>

      {/* Amenities */}
      <h3 className="text-xl font-semibold mt-10 mb-4 text-gray-800">
        Amenities
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {amenitiesOptions.map((amenity) => (
          <label key={amenity} className="flex items-center gap-2 text-gray-700">
            <input
              type="checkbox"
              checked={roomData.amenities.includes(amenity)}
              onChange={() => handleAmenityChange(amenity)}
              className="h-5 w-5 text-red-500 border-gray-300 rounded"
            />
            {amenity}
          </label>
        ))}
      </div>

      {/* Cancellation Rules */}
      <h3 className="text-xl font-semibold mt-10 mb-4 text-gray-800">
        Cancellation Policy
      </h3>
      <div className="grid md:grid-cols-3 gap-6">
        <input
          type="number"
          placeholder="Free Cancellation (Hours)"
          value={roomData.cancellationRules.freeCancellationHours}
          onChange={(e) =>
            setRoomData({
              ...roomData,
              cancellationRules: {
                ...roomData.cancellationRules,
                freeCancellationHours: parseInt(e.target.value),
              },
            })
          }
          className="border-2 border-gray-300 rounded-lg p-3 focus:border-red-500 focus:ring-1 focus:ring-red-500"
        />
        <input
          type="number"
          placeholder="Cancellation Fee (₹)"
          value={roomData.cancellationRules.cancellationFee}
          onChange={(e) =>
            setRoomData({
              ...roomData,
              cancellationRules: {
                ...roomData.cancellationRules,
                cancellationFee: parseFloat(e.target.value),
              },
            })
          }
          className="border-2 border-gray-300 rounded-lg p-3 focus:border-red-500 focus:ring-1 focus:ring-red-500"
        />
        <label className="flex items-center gap-2 text-gray-700 mt-3">
          <input
            type="checkbox"
            checked={roomData.cancellationRules.nonRefundable}
            onChange={(e) =>
              setRoomData({
                ...roomData,
                cancellationRules: {
                  ...roomData.cancellationRules,
                  nonRefundable: e.target.checked,
                },
              })
            }
            className="h-5 w-5 text-red-500 border-gray-300 rounded"
          />
          Non-Refundable
        </label>
      </div>

      {/* Images */}
      <h3 className="text-xl font-semibold mt-10 mb-4 text-gray-800">Images</h3>
      {images.map((img, idx) => (
        <input
          key={idx}
          type="file"
          onChange={(e) => handleImageChange(idx, e.target.files[0])}
          className="border-2 border-gray-300 rounded-lg p-2 w-full mb-3 focus:border-red-500 focus:ring-1 focus:ring-red-500"
        />
      ))}
      <button
        type="button"
        onClick={addMoreImage}
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
      >
        + Add More Images
      </button>

      {/* Active toggle */}
      <div className="flex items-center gap-2 mt-6">
        <input
          type="checkbox"
          checked={roomData.isActive}
          onChange={(e) =>
            setRoomData({ ...roomData, isActive: e.target.checked })
          }
          className="h-5 w-5 text-red-500 border-gray-300 rounded"
        />
        <span className="text-gray-700">Active Room</span>
      </div>

      {/* Submit */}
      <div className="text-center mt-10">
        <button
          type="submit"
          className="bg-red-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-red-600 transition"
        >
          Add Room
        </button>
      </div>
    </form>
  );
};

export default AddRooms;
