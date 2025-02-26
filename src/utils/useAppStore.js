import { create } from "zustand";

export const useAppStore = create((set) => ({
  bookmarks: [],
  setBookmarks: (newBookmarks) => set({ bookmarks: newBookmarks }),
  boomarkUpdate: false,
  setBookmarkUpdate: (update) => set({ boomarkUpdate: update }),
}));
