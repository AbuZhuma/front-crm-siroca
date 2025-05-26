import { create } from "zustand";
type statusType = "global" | "norm" | "none"

interface ILoading {
    status: statusType,
    setStatus: (data: statusType) => void
}

export const loadingStatus = create<ILoading>((set) => ({
   status: "none", 
   setStatus: (data) => {
      set({status: data})
   }
}));
