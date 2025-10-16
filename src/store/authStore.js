import { create } from "zustand"

const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,

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
    }
}))

export default useAuthStore