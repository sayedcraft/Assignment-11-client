// import React from 'react';

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";

const Coverage = () => {
  const [serviceCenters, setServiceCenter] = useState([]);
  const position = [23.685, 90.3563];
  const mapRef = useRef(null);

  useEffect(() => {
    fetch("/serviceCenter.json")
      .then((res) => res.json())
      .then((data) => setServiceCenter(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="text-center">
        <h1 className="font-bold text-4xl mb-2">
          Our <span className="text-sky-500">Coverage Area</span>
        </h1>
        <p className="text-gray-500">
          Delivering Books Across Major Cities. We currently serve readers in
          multiple cities, bringing library books directly to your home.
        </p>
      </div>
      <div class="flex items-center gap-4 p-3 justify-center">
        <div class="flex items-center gap-2 px-4 py-2.5 w-full max-w-md bg-white rounded-full border border-gray-200 shadow-sm transition-all">
          <svg fill="currentColor" class="h-4 w-4 text-gray-400 ">
            <path
              fill-rule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clip-rule="evenodd"
            />
          </svg>
          <input
            type="text"
            placeholder="Search here"
            class="w-full bg-transparent text-gray-500 placeholder-gray-400 border-none outline-none focus:outline-none "
          />
        </div>

        <button class="btn bg-sky-500 hover:bg-amber-500 text-white border-none rounded-full px-5 text-base font-semibold shadow-sm normal-case">
          Search
        </button>
      </div>
      <div className="border-b border-gray-400 mt-3 w-full"></div>
      <div className="w-full h-150overflow-hidden -z-100  shadow">
        <MapContainer
          ref={mapRef}
          center={position}
          zoom={8}
          scrollWheelZoom={false}
          className="h-150"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap Contributors"
          />

          {serviceCenters.map((center, index) => (
            <Marker key={index} position={[center.latitude, center.longitude]}>
              <Popup>
                <strong>{center.district}</strong>
                <br />
                Service Area: {center.covered_area.join(", ")}.
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
