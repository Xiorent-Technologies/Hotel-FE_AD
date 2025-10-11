import React, { useEffect } from "react";
import { FaLocationDot, FaPhone, FaEnvelope, FaGlobe } from "react-icons/fa6";
import { useRoomStore } from "../stores/useRoomStore";

function AdminHotels() {
  const { getAllHotels, hotels } = useRoomStore();

  useEffect(() => {
    getAllHotels();
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-50 py-10">
      <div className="w-full max-w-6xl px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          🏨 All Hotels
        </h2>

        {!hotels ? (
          <div className="text-center py-12 text-gray-600">
            Loading hotels...
          </div>
        ) : hotels.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No hotels found. Try adding one!
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {hotels.map((hotel) => (
              <div
                key={hotel._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                {/* Top Section */}
                <div className="flex flex-col sm:flex-row">
                  <img
                    src="/roompage1.png"
                    alt={hotel.name}
                    className="w-full sm:w-48 h-48 object-cover"
                  />

                  <div className="p-5 flex flex-col justify-between w-full">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {hotel.name}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                        {hotel.description || "No description available."}
                      </p>

                      <p className="flex items-center gap-2 text-gray-700 mt-3">
                        <FaLocationDot className="text-red-500" />
                        {hotel.location?.address}, {hotel.location?.city},{" "}
                        {hotel.location?.state}, {hotel.location?.country}
                      </p>
                    </div>

                    {/* Rating */}
                    <div className="mt-3 flex items-center gap-2 text-sm">
                      <span className="font-medium text-yellow-600">
                        ⭐ {hotel.rating?.average || 0}
                      </span>
                      <span className="text-gray-500">
                        ({hotel.rating?.totalReviews || 0} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-100"></div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5">
                  {/* Contact */}
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">
                      Contact Info
                    </h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      {hotel.contact?.phone && (
                        <p className="flex items-center gap-2">
                          <FaPhone className="text-gray-500" />{" "}
                          {hotel.contact.phone}
                        </p>
                      )}
                      {hotel.contact?.email && (
                        <p className="flex items-center gap-2">
                          <FaEnvelope className="text-gray-500" />{" "}
                          {hotel.contact.email}
                        </p>
                      )}
                      {hotel.contact?.website && (
                        <a
                          href={hotel.contact.website}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 text-blue-600 hover:underline"
                        >
                          <FaGlobe className="text-gray-500" /> Website
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Policies */}
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Policies</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>
                        <strong>Check-In:</strong>{" "}
                        {hotel.policies?.checkInTime || "N/A"}
                      </p>
                      <p>
                        <strong>Check-Out:</strong>{" "}
                        {hotel.policies?.checkOutTime || "N/A"}
                      </p>
                      <p>
                        <strong>Cancellation:</strong>{" "}
                        {hotel.policies?.cancellationPolicy || "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Amenities</h4>
                    <div className="flex flex-wrap gap-2 text-sm">
                      {hotel.amenities?.length > 0 ? (
                        hotel.amenities.map((a, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-red-100 text-red-700 rounded-md"
                          >
                            {a}
                          </span>
                        ))
                      ) : (
                        <p className="text-gray-500">No amenities listed</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center px-5 py-3 bg-gray-50 border-t border-gray-100 text-sm text-gray-600">
                  <p>
                    Status:{" "}
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-medium ${
                        hotel.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : hotel.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {hotel.status}
                    </span>
                  </p>
                  <p>
                    Added on:{" "}
                    {new Date(hotel.createdAt).toLocaleDateString("en-IN")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminHotels;
