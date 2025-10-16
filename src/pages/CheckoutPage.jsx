import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, CreditCard, Wallet, Building } from 'lucide-react';
import useCartStore from '../store/cartStore';
import useAuthStore from '../store/authStore';

const CheckoutPage = () => {
    const { items, total, updateQuantity, removeItem, clearCart } = useCartStore();
    const { user, isAuthenticated } = useAuthStore();
    const navigate = useNavigate();
    
    const [phoneNumber, setPhoneNumber] = useState(user?.phone || '');
    const [paymentMethod, setPaymentMethod] = useState('ewallet');
    const [isProcessing, setIsProcessing] = useState(false);

    const handleCheckout = async () => {
        if (!phoneNumber) {
            alert('Silakan masukkan nomor telepon');
            return;
        }

        if (!isAuthenticated) {
            alert('Silakan login terlebih dahulu');
            navigate('/login');
            return;
        }

        setIsProcessing(true);
        
        // simulasi pembayaran
        setTimeout(() => {
            alert('Pembayaran berhasil! Paket internet akan segera aktif.');
            clearCart();
            navigate('/transactions');
            setIsProcessing(false);
        }, 2000);
    };

    if (items.length === 0) {
        return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center glass-card p-12">
                <h2 className="text-3xl font-heading font-bold text-white mb-4">
                    Keranjang Kosong
                </h2>
                <p className="text-gray-300 mb-8">
                    Tambahkan paket internet ke keranjang belanja Anda
                </p>
                <Link to="/products" className="premium-button">
                    Lihat Paket
                </Link>
            </div>
        </div>
        );
    }

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-heading font-bold text-white mb-8 text-center">
                    Checkout
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="glass-card p-6">
                        <h2 className="text-2xl font-semibold text-white mb-4">
                            Ringkasan Pesanan
                        </h2>
                        
                        <div className="space-y-4">
                            {items.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                                <div className="flex items-center space-x-4">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-12 object-cover rounded-lg"
                                />
                                <div>
                                    <h3 className="text-white font-semibold">{item.name}</h3>
                                    <p className="text-gray-300 text-sm">
                                    Rp {item.price.toLocaleString()} x {item.quantity}
                                    </p>
                                </div>
                                </div>
                                
                                <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-2">
                                    <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                                    >
                                    <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="text-white w-8 text-center">{item.quantity}</span>
                                    <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                                    >
                                    <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                                <button
                                    onClick={() => removeItem(item.id)}
                                    className="text-red-400 hover:text-red-300 transition-colors p-2"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                </div>
                            </div>
                            ))}
                        </div>

                        <div className="border-t border-white/20 pt-4 mt-4">
                            <div className="flex justify-between items-center text-lg">
                            <span className="text-gray-300">Total:</span>
                            <span className="text-white font-bold text-xl">
                                Rp {total.toLocaleString()}
                            </span>
                            </div>
                        </div>
                        </div>

                        {/* Phone Number */}
                        <div className="glass-card p-6">
                        <h3 className="text-white font-semibold mb-3">
                            Nomor Telepon Penerima
                        </h3>
                        <input
                            type="tel"
                            placeholder="Masukkan nomor telepon"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                        />
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Payment Method */}
                        <div className="glass-card p-6">
                        <h2 className="text-2xl font-semibold text-white mb-4">
                            Metode Pembayaran
                        </h2>
                        
                        <div className="space-y-3">
                            {[
                            { id: 'ewallet', name: 'E-Wallet', icon: Wallet, description: 'OVO, Gopay, Dana, dll' },
                            { id: 'bank', name: 'Transfer Bank', icon: Building, description: 'BCA, BNI, Mandiri, dll' },
                            { id: 'cc', name: 'Kartu Kredit', icon: CreditCard, description: 'Visa, Mastercard' }
                            ].map((method) => (
                            <label
                                key={method.id}
                                className={`flex items-center space-x-4 p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                                paymentMethod === method.id
                                    ? 'border-primary-500 bg-primary-500/20'
                                    : 'border-white/10 bg-white/5 hover:border-white/20'
                                }`}
                            >
                                <input
                                type="radio"
                                name="payment"
                                value={method.id}
                                checked={paymentMethod === method.id}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="hidden"
                                />
                                <div className={`p-3 rounded-lg ${
                                paymentMethod === method.id ? 'bg-primary-500' : 'bg-white/10'
                                }`}>
                                <method.icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                <div className="text-white font-semibold">{method.name}</div>
                                <div className="text-gray-300 text-sm">{method.description}</div>
                                </div>
                            </label>
                            ))}
                        </div>
                        </div>

                        {/* Order Total */}
                        <div className="glass-card p-6">
                        <h3 className="text-white font-semibold mb-4">Total Pembayaran</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                            <span className="text-gray-300">Subtotal:</span>
                            <span className="text-white">Rp {total.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                            <span className="text-gray-300">Biaya Admin:</span>
                            <span className="text-white">Rp 0</span>
                            </div>
                            <div className="flex justify-between pt-2 border-t border-white/20">
                            <span className="text-gray-300">Total:</span>
                            <span className="text-primary-300 font-bold text-lg">
                                Rp {total.toLocaleString()}
                            </span>
                            </div>
                        </div>

                        <button
                            onClick={handleCheckout}
                            disabled={isProcessing}
                            className="w-full premium-button mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isProcessing ? (
                            <div className="flex items-center justify-center space-x-2">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Memproses Pembayaran...</span>
                            </div>
                            ) : (
                            'Bayar Sekarang'
                            )}
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;