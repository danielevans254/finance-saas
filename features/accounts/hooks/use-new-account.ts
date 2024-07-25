import { create } from "zustand";

type NewAccountState = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

const useNewAccount = create<NewAccountState>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));

export default useNewAccount;