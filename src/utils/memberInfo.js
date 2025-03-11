import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useMemberInfo = create(
  persist(
    (set) => ({
      memberInfo: {
        email: "",
        name: "",
        profile: "",
        role: "",
      },
      setMemberInfo: (state) => set({ memberInfo: state }),
      clearMemberInfo: () =>
        set({
          memberInfo: { email: "", name: "", profile: "", role: "" },
        }),
    }),
    {
      name: "member-info-storage",
      getStorage: () => sessionStorage,
    }
  )
);
