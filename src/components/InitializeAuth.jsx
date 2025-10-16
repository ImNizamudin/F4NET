import { useEffect } from "react"
import useAuthStore from "../store/authStore"

const InitializeAuth = () => {
    const initializeAuth = useAuthStore((state) => state.initializeAuth)

    useEffect(() => {
        initializeAuth()
    }, [initializeAuth])

    return null
}

export default InitializeAuth
