import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Wifi, Shield, Zap, Users, Rocket, Sparkles } from 'lucide-react';
import useProductStore from '../store/productStore';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';

const LandingPage = () => {
    const { products, fetchProducts } = useProductStore();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const featuredProducts = products.filter(p => p.popular || p.bestseller).slice(0, 4);

    return (
        <div className="min-h-screen">
            <section className="relative py-20 px-4 overflow-hidden">
                <div className="max-w-7xl mx-auto text-center relative z-10">

                    <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8">
                        <Sparkles className="w-4 h-4 text-white" />
                        <span className="text-white text-sm font-medium">Internet Premium Terpercaya</span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 leading-tight">
                        Experience <span className="gradient-text"> Ultimate</span>
                        <br />
                        Internet Speed
                    </h1>
                    <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                        Nikmati pengalaman internet terbaik dengan teknologi fiber optic terkini. 
                        <span className="text-white font-semibold"> Kecepatan tinggi, latency rendah,</span> dan stabilitas maksimal untuk semua kebutuhan <span className='text-white font-semibold'>online</span> Anda.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link to="/products" className="premium-button inline-flex items-center space-x-3">
                        <Rocket className="w-5 h-5" />
                        <span>Jelajahi Paket</span>
                        <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link to="/login" className="secondary-button inline-flex items-center space-x-3">
                        <span>Mulai Berlangganan</span>
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
                        Mengapa Memilih <span className="gradient-text">F4NET?</span>
                        </h2>
                        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                        Layanan internet premium dengan teknologi fiber optic terdepan untuk pengalaman browsing tanpa batas
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                        {
                            icon: <Zap className="w-12 h-12" />,
                            title: 'Kecepatan Tinggi',
                            description: 'Dukung aktivitas streaming 4K, gaming competitive, dan video conference dengan kecepatan hingga 1Gbps',
                            features: ['Up to 1Gbps', 'Low Latency', 'No Throttling']
                        },
                        {
                            icon: <Shield className="w-12 h-12" />,
                            title: 'Aman & Terjamin',
                            description: 'Infrastruktur terenkripsi dengan monitoring 24/7 untuk keamanan dan kenyamanan berinternet',
                            features: ['Encrypted', '24/7 Monitoring', 'DDoS Protection']
                        },
                        {
                            icon: <Users className="w-12 h-12" />,
                            title: 'Dukungan Premium',
                            description: 'Tim technical support berpengalaman siap membantu Anda kapan saja dengan respon under 5 menit',
                            features: ['24/7 Support', <>,Under 5&apos; Response</>, 'Expert Team']
                        }
                        ].map((feature, index) => (
                        <div key={index} className="glass-card-dark p-8 group hover:scale-105 transition-all duration-500">
                            <div className="text-white mb-6 flex justify-center">
                                <div className="p-4 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10">
                                    {feature.icon}
                                </div>
                            </div>
                            <h3 className="text-white font-semibold text-xl mb-4 text-center">
                                {feature.title}
                            </h3>
                            <p className="text-gray-300 text-center mb-6 leading-relaxed">
                                {feature.description}
                            </p>
                            <div className="flex flex-wrap gap-2 justify-center">
                            {feature.features.map((feat, featIndex) => (
                                <span
                                    key={featIndex}
                                    className="bg-white/5 text-gray-300 text-xs px-3 py-2 rounded-lg border border-white/10"
                                >
                                    {feat}
                                </span>
                            ))}
                            </div>
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
                        Siap Mengalami Revolusi Internet?
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

            <Footer />
        </div>
    );
};

export default LandingPage;