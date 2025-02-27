"use client";
import React, { useState, useMemo } from "react";
import * as icons from "simple-icons";

const topIconSlugs = ["google", "netflix", "microsoft", "amazon", "facebook", "twitter", "apple", "youtube", "linkedin", "instagram"];

const SimpleIconsViewer = () => {
  const iconList = Object.values(icons);
  const [search, setSearch] = useState("");

  const topIcons = useMemo(
    () => iconList.filter(icon => topIconSlugs.includes(icon.slug)),
    []
  );

  const filteredIcons = useMemo(() => {
    return iconList.filter((icon) =>
      icon.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, iconList]);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Simple Icons Viewer</h1>
      <div className="relative w-full max-w-lg mb-6">
        <input
          type="text"
          placeholder="Search icons..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 pl-10 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <svg
          className="absolute left-3 top-3 w-6 h-6 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-4.35-4.35M15 10a5 5 0 10-10 0 5 5 0 0010 0z"
          />
        </svg>
      </div>

      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Top Icons</h2>
      <div className="grid grid-cols-5 gap-6 mb-8">
        {topIcons.map((icon) => (
          <div key={icon.slug} className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="56"
              height="56"
              fill={`#${icon.hex}`}
            >
              <path d={icon.path} />
            </svg>
            <p className="text-sm mt-2 text-gray-600 font-medium">{icon.title}</p>
          </div>
        ))}
      </div>

      {search && (
        <>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Search Results</h2>
          <div className="grid grid-cols-5 gap-6">
            {filteredIcons.slice(0, 15).map((icon) => (
              <div key={icon.slug} className="flex flex-col items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="56"
                  height="56"
                  fill={`#${icon.hex}`}
                >
                  <path d={icon.path} />
                </svg>
                <p className="text-sm mt-2 text-gray-600 font-medium">{icon.title}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SimpleIconsViewer;