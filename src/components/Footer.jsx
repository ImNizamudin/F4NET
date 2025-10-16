import React from 'react';
import { Link } from 'react-router-dom';
import { Wifi, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-br from-gray-900 to-primary-900 border-t border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                
                    <div className="lg:col-span-1">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-white to-gray-300 rounded-xl flex items-center justify-center">
                                <Wifi className="w-6 h-6 text-gray-900" />
                            </div>
                            <span className="text-white font-heading font-bold text-2xl">F4NET</span>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed mb-4">
                            Dapatkan paket internet premium terbaik untuk semua kebutuhan digital Anda. 
                            Kecepatan tinggi, stabilitas maksimal, dan layanan 24/7.
                        </p>
                        <div className="flex items-center space-x-2 text-gray-400">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">Jakarta, Indonesia</span>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">Produk</h3>
                        <ul className="space-y-2">
                        {[
                            'Paket Harian',
                            'Paket Mingguan', 
                            'Paket Bulanan',
                            'Paket Gaming',
                            'Paket Unlimited',
                            'Paket Keluarga'
                        ].map((product, index) => (
                            <li key={index}>
                            <Link 
                                to="/products" 
                                className="text-gray-300 hover:text-white transition-colors text-sm"
                            >
                                {product}
                            </Link>
                            </li>
                        ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">Bantuan</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/about" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    Tentang Kami
                                </Link>
                            </li>
                            <li>
                                <Link to="/faq" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link to="/how-it-works" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    Cara Kerja
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    Kebijakan Privasi
                                </Link>
                            </li>
                            <li>
                                <Link to="/payment" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    Kebijakan Pembayaran
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">Hubungi Kami</h3>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                                <Mail className="w-4 h-4 text-gray-300" />
                                </div>
                                <div>
                                <p className="text-gray-300 text-sm">Email</p>
                                <a 
                                    href="mailto:customer@f4net.com" 
                                    className="text-white text-sm hover:text-gray-300 transition-colors"
                                >
                                    customer@f4net.com
                                </a>
                                </div>
                            </div>
                        
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                                <Phone className="w-4 h-4 text-gray-300" />
                                </div>
                                <div>
                                <p className="text-gray-300 text-sm">Telepon</p>
                                <a 
                                    href="tel:+62554862354" 
                                    className="text-white text-sm hover:text-gray-300 transition-colors"
                                >
                                    +62 554 862 354
                                </a>
                                </div>
                            </div>

                            <div className="pt-2">
                                <p className="text-gray-300 text-sm mb-2">Follow Kami</p>
                                <div className="flex space-x-3">
                                {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((social, index) => (
                                    <a
                                    key={index}
                                    href="#"
                                    className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
                                    title={social}
                                    >
                                    <span className="text-gray-300 text-xs font-semibold">
                                        {social.charAt(0)}
                                    </span>
                                    </a>
                                ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} F4NET. All rights reserved.
                        </div>
                        
                        <div className="flex space-x-6">
                        <Link to="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                            Terms & Conditions
                        </Link>
                        <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                            Privacy Policy
                        </Link>
                        <Link to="/cookies" className="text-gray-400 hover:text-white transition-colors text-sm">
                            Cookie Policy
                        </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;