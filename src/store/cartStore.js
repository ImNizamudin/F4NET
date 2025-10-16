import { create } from "zustand";

const useCartStore = create((set, get) => ({
    items: [],
    total: 0,

    addItem: (product) => {
        const items = get().items;
        const existingItem = items.find(item => item.id === product.id);
        
        if (existingItem) {
            const updatedItems = items.map(item =>
                item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
            set({ items: updatedItems });
        } else {
            set({ items: [...items, { ...product, quantity: 1 }] });
        }
        get().calculateTotal();
    },

    // menghitung total harga pada cart
    calculateTotal: () => {
        const total = get().items.reduce(
          (sum, item) => sum + (item.price * item.quantity), 0
        );
        set({ total });
    },

    // menghapus item dari cart
    removeItem: (product_id) => {
        set({ items: get().items.filter(item => item.id !== product_id) })
        get().calculateTotal()
    },

    // update total item di cart
    updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
            get().removeItem(productId);
            return;
        }
        
        const updatedItems = get().items.map(item =>
            item.id === productId ? { ...item, quantity } : item
        );
        set({ items: updatedItems });
        get().calculateTotal();
    },

    // hapus all item di cart
    clearCart: () => {
        set({items: [], total: 0 })
    }
}))

export default useCartStore