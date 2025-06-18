import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

interface DeviceState {
  deviceId: string;
  initDeviceId: () => void;
}

export const useDeviceStore = create<DeviceState>((set) => ({
  deviceId: "",
  initDeviceId: () => {
    let id = localStorage.getItem("deviceId");
    if (!id) {
      id = uuidv4();
      localStorage.setItem("deviceId", id);
    }
    set({ deviceId: id });
  },
}));
