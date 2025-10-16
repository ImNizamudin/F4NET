import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Download } from 'lucide-react';
import useAuthStore from '../store/authStore';
import TransactionCard from '../components/TransactionCard';

const TransactionHistoryPage = () => {
    const { user, isAuthenticated } = useAuthStore();
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (!isAuthenticated) {
        navigate('/login');
        return;
        }

        const fetchTransactions = async () => {
        try {
            const response = await fetch(`http://localhost:3000/transactions?user_id=${user.id}`);
            const data = await response.json();
            setTransactions(data);
            setFilteredTransactions(data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
        };

        fetchTransactions();
    }, [isAuthenticated, navigate, user]);

    useEffect(() => {
        let filtered = transactions;

        if (searchQuery) {
            filtered = filtered.filter(t =>
                t.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                t.transaction_id.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredTransactions(filtered);
    }, [searchQuery, transactions]);

    const stats = {
        total: transactions.length,
        success: transactions.filter(t => t.status === 'success').length,
        failed: transactions.filter(t => t.status === 'failed').length,
        pending: transactions.filter(t => t.status === 'pending').length
    };

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                <h1 className="text-4xl font-heading font-bold text-white mb-2">
                    Riwayat Transaksi
                </h1>
                <p className="text-gray-300">
                    Kelola dan pantau semua transaksi paket internet Anda
                </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                    { label: 'Total', value: stats.total, color: 'from-blue-500 to-cyan-500' },
                    { label: 'Berhasil', value: stats.success, color: 'from-green-500 to-emerald-500' },
                    { label: 'Pending', value: stats.pending, color: 'from-yellow-500 to-orange-500' },
                    { label: 'Gagal', value: stats.failed, color: 'from-red-500 to-pink-500' }
                ].map((stat, index) => (
                    <div
                    key={index}
                    className="glass-card p-4 text-center hover:scale-105 transition-all duration-300"
                    >
                    <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                        {stat.value}
                    </div>
                    <div className="text-gray-300 text-sm mt-1">{stat.label}</div>
                    </div>
                ))}
                </div>

                <div className="glass-card p-6 mb-8">
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                        <div className="relative flex-1 w-full lg:max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Cari transaksi..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                            />
                        </div>
                    </div>
                </div>

                <>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-heading font-bold text-white">
                            Daftar Transaksi
                        </h2>
                        <p className="text-gray-300">
                            {filteredTransactions.length} transaksi ditemukan
                        </p>
                    </div>

                    {filteredTransactions.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {filteredTransactions
                                .sort((a, b) => new Date(b.transaction_date) - new Date(a.transaction_date))
                                .map((transaction) => (
                                <TransactionCard key={transaction.id} transaction={transaction} />
                                ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 glass-card">
                            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-white text-xl font-semibold mb-2">
                                Transaksi tidak ditemukan
                            </h3>
                            <p className="text-gray-300">
                                Tidak ada transaksi yang sesuai dengan pencarian Anda
                            </p>
                        </div>
                    )}
                </>
            </div>
        </div>
    );
};

export default TransactionHistoryPage;