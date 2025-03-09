import { create } from "zustand";

export const useAppStore = create((set) => ({
  notifications: [],
  addNotification: (newNotification) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        { id: Date.now(), ...newNotification },
      ],
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}));
