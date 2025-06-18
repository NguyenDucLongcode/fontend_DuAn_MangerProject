"use client";

import React from "react";
import "./loading.css";

export default function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4 bg-gray-100">
      <div className="cube relative">
        <div className="cube-face front" />
        <div className="cube-face back" />
        <div className="cube-face right" />
        <div className="cube-face left" />
        <div className="cube-face top" />
        <div className="cube-face bottom" />
      </div>
      <p className="text-gray-600 text-lg font-medium">Loading...</p>
    </div>
  );
}
