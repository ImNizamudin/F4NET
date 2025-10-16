import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Wifi, Shield, Zap, Users, Rocket, Sparkles, Globe } from 'lucide-react';
import useAuthStore from "../store/authStore";
import useProductStore from '../store/productStore';
import ProductCard from '../components/ProductCard';

const Beranda = () => {
    const { user } = useAuthStore()
    const { products, fetchProducts } = useProductStore();

    console.log(user)

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const featuredProducts = products.filter(p => p.popular || p.bestseller).slice(0, 4);

    return (
        <div className="min-h-screen">
            <section className="py-10 px-4">
                <div className="max-w-7xl mx-auto flex justify-center items-center flex-col text-center">
                    <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8">
                        <Sparkles className="w-4 h-4 text-white" />
                        <span className="text-white text-sm font-medium">Pagi, {user.username}</span>
                    </div>

                    <div className="flex flex-1 flex-wrap gap-8 justify-between glass-card-dark max-w-7xl group hover:scale-105 transition-all duration-500">
                        <div className="text-white flex-1 flex justify-center md:p-8">
                            <div className="p-10 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10 flex items-center text-center flex-col gap-4">
                                <Globe className='w-6 h-6 md:w-12 md:h-12' />
                                <h3 className="text-white font-semibold text-sm md:text-xl text-center">
                                    5.4 GB
                                </h3>
                                <p className="text-gray-300 text-center text-sm md:text-xl leading-relaxed">
                                    Kuota
                                </p>
                            </div>
                        </div>

                        <div className="text-white flex-1 flex justify-center md:p-8">
                            <div className="p-10 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10 flex items-center text-center flex-col gap-4">
                                <Zap className='w-6 h-6 md:w-12 md:h-12' />
                                <h3 className="text-white font-semibold md:text-xl text-center">
                                    1.2 MB
                                </h3>
                                <p className="text-gray-300 text-sm text-center md:text-xl leading-relaxed">
                                    Kecepatan
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative py-10 px-4 overflow-hidden">
                <div className="max-w-7xl mx-auto text-center relative z-10">

                    <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8">
                        <Sparkles className="w-4 h-4 text-white" />
                        <span className="text-white text-sm font-medium">Promo Hari Ini</span>
                        <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    
                    <h1 className="text-5xl md:text-6xl font-heading font-bold text-white mb-6 leading-tight">
                        Special <span className="gradient-text"> Internet</span>
                        <br />
                        Access 5G
                    </h1>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link to="/products" className="premium-button inline-flex items-center space-x-3">
                            <Rocket className="w-5 h-5" />
                            <span>Jelajahi Paket</span>
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
                        {[
                        { number: '50K+', label: 'Pelanggan' },
                        { number: '99.9%', label: 'Uptime' },
                        { number: '24/7', label: 'Support' }
                        ].map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-2xl md:text-3xl font-bold text-white mb-2">{stat.number}</div>
                            <div className="text-gray-400 text-sm">{stat.label}</div>
                        </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-heading font-bold text-white mb-4">
                        Paket <span className="gradient-text">Populer</span>
                        </h2>
                        <p className="text-gray-300 text-lg">
                        Pilihan paket internet terfavorit pelanggan premium kami
                        </p>
                    </div>

                    {featuredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {featuredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-400 py-12 glass-card-dark rounded-2xl">
                            <Wifi className="w-16 h-16 mx-auto mb-4 opacity-50" />
                            <p>Loading produk...</p>
                        </div>
                    )}

                    <div className="text-center mt-12">
                        <Link to="/products" className="accent-button inline-flex items-center space-x-3">
                            <span>Lihat Semua Paket</span>
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto glass-card-dark p-12 text-center relative overflow-hidden">
                    
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                
                <h2 className="text-4xl font-heading font-bold text-white mb-4 relative z-10">
                    Upgrade Kualitasmu dengan F4NET!
                </h2>
                <p className="text-gray-300 text-lg mb-8 relative z-10 max-w-2xl mx-auto">
                    Bergabunglah dengan komunitas pengguna F4NET dan rasakan perbedaan internet premium yang sesungguhnya
                </p>
                <Link to="/products" className="premium-button inline-flex items-center space-x-3 relative z-10">
                    <Rocket className="w-5 h-5" />
                    <span>Mulai Sekarang</span>
                </Link>
                </div>
            </section>
        </div>
    );
};

export default Beranda;