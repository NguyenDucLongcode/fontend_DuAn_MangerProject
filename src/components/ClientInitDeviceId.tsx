"use client";

import { useDeviceStore } from "@/lib/deviceStore";
import { useEffect } from "react";

export default function ClientInitDeviceId() {
  const initDeviceId = useDeviceStore((state) => state.initDeviceId);

  useEffect(() => {
    initDeviceId();
  }, [initDeviceId]);

  return null; // không render gì
}
