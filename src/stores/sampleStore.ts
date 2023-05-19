import { create } from 'zustand';

interface Sample {
    amount: number
    title: string
    updateAmount: (newAmount: number) => void
    updateTitle: (newTitle: string) => void
}

export const useSampleStore = create<Sample>((set, get) => ({
    amount: 40,
    title: 'A Whole New World',
    updateAmount: (newAmount: number) => {
        const amountState = get().amount
        set({ amount: newAmount + amountState })
    },
    updateTitle: async (newTitle: string) => {
        // await api fetching
        set({ title: newTitle })
    }
}));
