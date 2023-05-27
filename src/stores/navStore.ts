import { create } from 'zustand';

interface Nav {
    menu: boolean
    setMenu: (newMenu: boolean) => void
}

export const useNavStore = create<Nav>((set) => ({
    menu: false,
    setMenu: async (newMenu: boolean) => {
        set({ menu: newMenu })
    }
}));