import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via primary-900 to-accent-900">
            <div className="fixed inset-0">
                // bg gradient
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-primary-900 to-accent-900"></div>

                // bg animasi lingkaran hitam abu abu
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-white/5 to-gray-400/5 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-gray-400/5 to-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-primary-400/5 to-accent-400/5 rounded-full blur-3xl animate-float"  style={{ animationDelay: '4s' }}></div>

                // bg overlay grid
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
            </div>

            <div className="relative z-10">
                <Navbar />
                <main className="pt-20">
                    { children }
                </main>
            </div>
        </div>
    )
}

export default Layout