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

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    const district = serviceCenters.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase()),
    );
    if (district) {
      const coord = [district.latitude, district.longitude];
      //console.log("district", district, "coord", coord);
      //goto the location
      mapRef.current.flyTo(coord, 14);
    }
  };

  return (
    <div>
      <div className="text-center my-5">
        <h1 className="font-bold text-4xl mb-2">
          Our <span className="text-sky-500">Coverage Area</span>
        </h1>
        <p className="text-gray-500">
          Delivering Books Across Major Cities. We currently serve readers in
          multiple cities, bringing library books directly to your home.
        </p>
      </div>
      <div className="my-6 flex justify-center">
        <form
          onSubmit={handleSearch}
          className="w-full md:w-md relative flex item-center"
        >
          <label className="input flex items-center gap-3 bg-white shadow-sm px-4 py-3 rounded-full">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              name="location"
              type="search"
              required
              placeholder="Search here"
              className="w-full outline-none"
            />
          </label>

          <button
            type="submit"
            className="absolute right-1  bg-sky-500 px-6 py-2 rounded-full font-semibold  cursor-pointer hover:bg-white border hover:text-black text-white border-white hover:border-sky-500"
          >
            Search
          </button>
        </form>
      </div>

      <div className="w-full h-150overflow-hidden -z-100  shadow mb-5">
        <MapContainer
          ref={mapRef}
          center={position}
          zoom={7}
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

      <div className="border-b border-gray-400 my-10 w-full"></div>
    </div>
  );
};

export default Coverage;
