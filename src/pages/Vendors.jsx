import React, { useEffect, useState } from "react";
import { useUserStore } from "../stores/useUserStore";
import { useRoomStore } from "../stores/useRoomStore";

const Vendors = () => {
  const { getAllVendors, vendors } = useUserStore();
  const { getVendorHotels } = useRoomStore();
  const [vendorHotelsCount, setVendorHotelsCount] = useState({}); // { vendorId: count }

  useEffect(() => {
    getAllVendors();
  }, []);

  useEffect(() => {
    const fetchHotelsCount = async () => {
      const counts = {};
      await Promise.all(
        vendors.map(async (vendor) => {
          const count = await getVendorHotels(vendor._id); // returns number now
          counts[vendor._id] = count ?? 0;
        })
      );
      setVendorHotelsCount(counts);
    };

    if (vendors.length > 0) {
      fetchHotelsCount();
    }
  }, [vendors]);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        🏨 Vendor Management
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-medium">#</th>
              <th className="py-3 px-4 text-left text-sm font-medium">Name</th>
              <th className="py-3 px-4 text-left text-sm font-medium">Email</th>
              <th className="py-3 px-4 text-left text-sm font-medium">Phone</th>
              <th className="py-3 px-4 text-left text-sm font-medium">No. of Hotels</th>
              <th className="py-3 px-4 text-left text-sm font-medium">Status</th>
              <th className="py-3 px-4 text-left text-sm font-medium">Joined At</th>
            </tr>
          </thead>

          <tbody className="text-gray-800">
            {vendors.map((vendor, index) => (
              <tr
                key={vendor._id}
                className="border-t border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="py-3 px-4 text-sm text-gray-600">{index + 1}</td>
                <td className="py-3 px-4 font-medium">{vendor.name}</td>
                <td className="py-3 px-4">{vendor.email}</td>
                <td className="py-3 px-4">{vendor.phone}</td>
                <td className="py-3 px-4 text-center">
                  {vendorHotelsCount[vendor._id] ?? "Loading..."}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      vendor.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {vendor.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  {new Date(vendor.createdAt).toLocaleDateString("en-IN")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Vendors;
