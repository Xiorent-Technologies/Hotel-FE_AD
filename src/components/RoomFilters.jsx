import React, { useState, useEffect } from "react";

const popularFilters = [
  "Free Wi-Fi",
  "Swimming Pool",
  "Air Conditioning",
  "Ocean View Balcony",
  "Private Pool",
  "Gym",
  "Hot Tub",
  "Spa",
  "Restaurant",
  "Bar",
  "All Inclusive meals",
  "Parking",
];

function FilterSection({ title, options, selected, onToggle }) {
  return (
    <div className="mb-6">
      <div className="text-lg font-bold text-gray-800 mb-1">{title}</div>
      <div className="border-t-2 border-black mb-2 w-[85%]" />
      <ul className="space-y-2">
        {options.map((label) => {
          const checked = selected.includes(label);
          return (
            <li key={label} className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 accent-red-600"
                  checked={checked}
                  onChange={() => onToggle(label)}
                />
                <span className={checked ? "text-red-600 font-medium text-[13px]" : "text-gray-800 text-[13px]"}>
                  {label}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function PriceFilter({ minPrice, maxPrice, value, onChange }) {
  const [minVal, maxVal] = value;

  const handleMinChange = (e) => {
    const val = Math.min(Number(e.target.value), maxVal - 1);
    onChange([val, maxVal]);
  };

  const handleMaxChange = (e) => {
    const val = Math.max(Number(e.target.value), minVal + 1);
    onChange([minVal, val]);
  };

  return (
    <div className="mb-6">
      <div className="text-lg font-bold text-gray-800 mb-2">Price Range</div>
      <div className="flex items-center justify-between text-sm text-gray-700 mb-2">
        <span>${minVal}</span>
        <span>${maxVal}</span>
      </div>

      <div className="relative h-6">
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={minVal}
          onChange={handleMinChange}
          className="absolute w-full pointer-events-auto appearance-none bg-transparent"
          style={{ zIndex: 2 }}
        />
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={maxVal}
          onChange={handleMaxChange}
          className="absolute w-full pointer-events-auto appearance-none bg-transparent"
          style={{ zIndex: 1 }}
        />

        <div className="absolute h-1 bg-gray-300 top-1/2 transform -translate-y-1/2 w-full rounded"></div>
        <div
          className="absolute h-1 bg-red-600 top-1/2 transform -translate-y-1/2 rounded"
          style={{
            left: `${((minVal - minPrice) / (maxPrice - minPrice)) * 100}%`,
            right: `${100 - ((maxVal - minPrice) / (maxPrice - minPrice)) * 100}%`,
          }}
        ></div>
      </div>
    </div>
  );
}

export default function SidebarFilters({ onChange }) {
  const [amenities, setAmenities] = useState([]);
  const [price, setPrice] = useState([0, 1000]);

  const toggleAmenity = (label) => {
    setAmenities((prev) =>
      prev.includes(label) ? prev.filter((a) => a !== label) : [...prev, label]
    );
  };

  // FIXED: Call onChange whenever filters change
  useEffect(() => {
    console.log("Filter values:", { amenities, minPrice: price[0], maxPrice: price[1] });
    onChange?.({ amenities, minPrice: price[0], maxPrice: price[1] });
  }, [amenities, price]);

  return (
    <div className="bg-white p-4 rounded-xl w-full mt-10 min-w-[240px]">
      <PriceFilter minPrice={0} maxPrice={1000} value={price} onChange={setPrice} />
      <FilterSection title="Amenities" options={popularFilters} selected={amenities} onToggle={toggleAmenity} />
    </div>
  );
}