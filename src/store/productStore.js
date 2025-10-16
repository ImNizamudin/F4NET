import { create } from "zustand";

const useProductStore = create((set, get) => ({
    products: [],
    categories: [],
    filteredProducts: [],
    selectedCategory: null,
    searchQuery: "",
    loading: false,

    fetchProducts: async () => {
        set({ loading: true})
        try {
            const response = await fetch("http://localhost:3000/products")
            const products = await response.json()
            set({
                products,
                filteredProducts: products,
                loading: false
            })
        } catch (error) {
            console.error("Failed to fetch products", error)
            set({ loading: false })
        }
    },

    fetchCategories: async () => {
        try {
            const response = await fetch('http://localhost:3001/categories');
            const categories = await response.json();
            set({ categories });
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    },

    filterByCategory: (categoryId) => {
        const { products, searchQuery } = get();
        let filtered = products;

        if (categoryId) {
            filtered = filtered.filter(p => p.category_id === categoryId);
        }

        if (searchQuery) {
            filtered = filtered.filter(p => 
                p.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        set({ filteredProducts: filtered, selectedCategory: categoryId });
    },

    setSearchQuery: (query) => {
        set({ searchQuery: query });
        get().filterByCategory(get().selectedCategory);
    }
}))

export default useProductStore