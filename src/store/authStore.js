import { create } from "zustand"

const useAuthStore = create((set) => ({
    user: localStorage.getItem("USER") ? JSON.parse(localStorage.getItem("user")) : null,
    isAuthenticated: localStorage.getItem("isAuthenticated"),
    loading: false,
    error: null,

    initializeAuth: () => {
        try {
            const userStore = localStorage.getItem("user");
            const authStore = localStorage.getItem("isAuthenticated")
            
            if (userStore && authStore === "true") {
                set({
                    user: JSON.parse(userStore),
                    isAuthenticated: true
                })
            }
        } catch(error) {
            console.error("error init auth : ", error)
            localStorage.removeItem("user");
            localStorage.removeItem("isAuthenticated")
        }
    },

    loginApp: async (email, password) => {
        set({ loading: true, error: null})
        try {
            const response = await fetch("http://localhost:3000/users?email=" + email)
            const users = await response.json()
            const user = users[0]

            if (user && user.password === password ) {
                set({ 
                    user: {...user, password: undefined},
                    isAuthenticated: true,
                    loading: false 
                })

                localStorage.setItem("user", JSON.stringify({...user, password: undefined}))
                localStorage.setItem("isAuthenticated", true);

                return true
            } else {
                throw new Error("Email atau Password Salah")
            }
        } catch (error) {
            set({
                error: error.message,
                loading: false
            })

            return false;
        }
    },

    logout: () => {
        set({
            user: null,
            isAuthenticated: false,
            error: null
        })

        localStorage.removeItem("user")
        localStorage.removeItem("isAuthenticated")
    }
}))

export default useAuthStore