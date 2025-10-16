import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Wifi, User, LogOut, Menu, X, ShoppingCart } from "lucide-react";
import useAuthStore from "../store/authStore";
import useCartStore from "../store/cartStore";

const Navbar = () => {
    const [isHumbergerOpen, setIsHumbergerOpen] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const { user, isAuthenticated, logout } = useAuthStore()
    const { items } = useCartStore()

    const handleLogout = () => {
        logout()
        navigate("/")
        setIsHumbergerOpen(false)
    }

    const cartItemLabel = items.reduce((total, item) => total + item.quantity, 0)

    return (
        <nav className="fixed top-0 w-full glass-card-dark z-50 border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center space-x-3 group">
                        <div className="w-12 h-12 bg-gradient-to-br from-white to-gray-300 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:shadow-white/20 transition-all duration-300">
                            <Wifi className="w-6 h-6 text-gray-900" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-white font-heading font-bold text-2xl leading-6">F4NET</span>
                            <span className="text-gray-400 text-xs">PREMIUM INTERNET</span>
                        </div>
                    </Link>

                    {isAuthenticated ? (
                    <>
                        <div className="hidden md:flex items-center space-x-8">
                            <Link to="/" className={`relative py-2 transition-all duration-300 ${
                                location.pathname === "/beranda" ? "text-white" : "text-gray-400 hover-text-white"
                            }`}>
                                Beranda
                                {location.pathname === "/beranda" && (
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-white to-gray-300"></span>
                                )}
                            </Link>
                            <Link to="/products" className={`relative py-2 transition-all duration-300 ${
                                location.pathname === "/products" ? "text-white" : "text-gray-400 hover-text-white"
                            }`}>
                                Products
                                {location.pathname === "/products" && (
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-white to-gray-300"></span>
                                )}
                            </Link>
                        </div>
                    
                        <div className="hidden md:flex items-center space-x-4">
                            <Link to="/checkout" className="relative flex p-3 transition-all duration-300 text-gray-400 hover:text-white group">
                                <div className="relative">
                                    <ShoppingCart className="w-6 h-6 transition-transform group-hover:scale-110" />
                                    {cartItemLabel > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-white text-gray-900 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg">
                                            {cartItemLabel}
                                        </span>
                                    )}
                                </div>
                            </Link>
                            <Link 
                                to="/transactions" 
                                className="text-white hover:text-gray-300 transition-colors py-2 border-b border-white/10"
                                onClick={() => setIsHumbergerOpen(false)}
                            >
                                Riwayat
                            </Link>
                            <div className="flex items-center">
                                <div className="flex items-center space-x-3">
                                    <div className="relative group:">
                                        <img src={user.avatar} alt={user.username} className="w-8 h-8 rounded-full border-2 border-white/20 group-hover:border-white/40 transition-all duration-300" />
                                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                                    </div>
                                    <span className="text-white text-sm font-medium">{user.username}</span>
                                </div>
                                <button className="text-gray-400 hover:text-red-300 transition-colors p-2" onClick={handleLogout}>
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </>
                    ) : (
                        <Link to={isAuthenticated ? "/beranda" : "/login"} className="premium-button text-sm">
                            Masuk
                        </Link>
                    )}

                    {isAuthenticated && (
                        <div className="md:hidden">
                            <button onClick={() => setIsHumbergerOpen(!isHumbergerOpen)} className="text-gray-400 hover:text-white p-2 transition-colors">
                                {isHumbergerOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    )}
                </div>


                {/* mobile view */}
                {isHumbergerOpen && isAuthenticated && (
                    <div className="md:hidden glass-card-dark rounded-xl p-4 mt-2 border border-white/10">
                        <div className="flex flex-col space-y-4">
                        <Link 
                            to="/" 
                            className="text-white hover:text-gray-300 transition-colors py-2 border-b border-white/10"
                            onClick={() => setIsHumbergerOpen(false)}
                        >
                            Beranda
                        </Link>
                        <Link 
                            to="/products" 
                            className="text-white hover:text-gray-300 transition-colors py-2 border-b border-white/10"
                            onClick={() => setIsHumbergerOpen(false)}
                        >
                            Produk
                        </Link>
                        {isAuthenticated && (
                            <>
                            <Link 
                                to="/dashboard" 
                                className="text-white hover:text-gray-300 transition-colors py-2 border-b border-white/10"
                                onClick={() => setIsHumbergerOpen(false)}
                            >
                                Dashboard
                            </Link>
                            <Link 
                                to="/transactions" 
                                className="text-white hover:text-gray-300 transition-colors py-2 border-b border-white/10"
                                onClick={() => setIsHumbergerOpen(false)}
                            >
                                Riwayat
                            </Link>
                            <div className="flex items-center space-x-3 pt-2 border-t border-white/20">
                                <img 
                                src={user.avatar} 
                                alt={user.username}
                                className="w-8 h-8 rounded-full border-2 border-white/20"
                                />
                                <div>
                                <div className="text-white text-sm font-medium">{user.username}</div>
                                <div className="text-gray-400 text-xs">{user.email}</div>
                                </div>
                            </div>
                            </>
                        )}
                        <div className="flex items-center justify-between pt-2 border-t border-white/20">
                            <Link 
                            to="/checkout" 
                            className="flex items-center space-x-2 text-white"
                            onClick={() => setIsHumbergerOpen(false)}
                            >
                            <ShoppingCart className="w-5 h-5" />
                            <span>Keranjang ({ cartItemLabel })</span>
                            </Link>
                            {isAuthenticated ? (
                            <button
                                onClick={handleLogout}
                                className="text-red-300 text-sm font-medium"
                            >
                                Keluar
                            </button>
                            ) : (
                            <Link 
                                to="/login" 
                                className="premium-button text-sm"
                                onClick={() => setIsHumbergerOpen(false)}
                            >
                                Masuk
                            </Link>
                            )}
                        </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar