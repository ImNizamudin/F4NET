import { useState } from "react"
import useAuthStore from "../store/authStore"
import { useNavigate, Link } from "react-router-dom"
import { Eye, EyeOff, LogIn } from "lucide-react"

const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPasssword] = useState()
    const [showPassword, setShowPassword] = useState(false)

    const {error, loading, loginApp} = useAuthStore()

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const login = await loginApp(email, password)
        if (login) {
            navigate("/beranda")
        }
    }

    return(
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full">
                <div className="flex justify-center mb-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center">
                        <span className="text-white font-bold text-2xl">F4</span>
                    </div>
                </div>
                <h2 className="text-3xl font-heading font-bold text-white text-center">
                    Masuk ke F4NET
                </h2>
                <p className="mt-1 text-gray-300 text-center">
                    Akses dashboard dan kelola paket internet Anda
                </p>

                <form className="mt-10 space-y-6 glass-card p-8" onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                            Alamat Email
                        </label>
                        <input type="email" id="email" placeholder="nizam@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary-500 focus-border-transparent transition-all duration-300" />
                    </>
                    <>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                            Kata Sandi
                        </label>
                        <div className="relative">
                            <input type={showPassword ? "text" : "password" } id="password" placeholder="Password Akun Anda" required value={password} onChange={(e) => setPasssword(e.target.value)} className="w-full px-3 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary-500 focus-border-transparent transition-all duration-300" />
                            <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                ) : (
                                    <Eye className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </>

                    <>
                        <button type="submit" disabled={loading} className="w-full premium-button disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2">
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <LogIn className="w-5 h-5" />
                            )}
                            <span>{loading ? "memproses" : "Masuk" }</span>
                        </button>
                    </>

                    <div className="text-center">
                        <p className="text-gray-400 text-sm">
                            Belum punya akun?<span> </span>
                            <Link to="/register" className="text-primary-400 hover:text-primary-300 transition-colors">
                                Daftar disini
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage