import { CheckCircle, XCircle, Clock } from 'lucide-react';

const TransactionCard = ({ transaction }) => {
    const getStatusIcon = (status) => {
        switch (status) {
        case 'success':
            return <CheckCircle className="w-5 h-5 text-green-500" />;
        case 'failed':
            return <XCircle className="w-5 h-5 text-red-500" />;
        default:
            return <Clock className="w-5 h-5 text-yellow-500" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
        case 'success':
            return 'text-green-400';
        case 'failed':
            return 'text-red-400';
        default:
            return 'text-yellow-400';
        }
    };

    return (
        <div className="glass-card p-6 hover:scale-105 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
                <div>
                <h3 className="text-white font-semibold text-lg">
                    {transaction.product_name}
                </h3>
                <p className="text-gray-300 text-sm mt-1">
                    {transaction.phone_number}
                </p>
                </div>
                
                <div className="flex items-center space-x-2">
                    {getStatusIcon(transaction.status)}
                    <span className={`text-sm font-medium ${getStatusColor(transaction.status)}`}>
                        {transaction.status === 'success' ? 'Berhasil' : 
                        transaction.status === 'failed' ? 'Gagal' : 'Pending'}
                    </span>
                </div>
            </div>

            <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-gray-400">ID Transaksi:</span>
                    <span className="text-white font-mono">{transaction.transaction_id}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">Tanggal:</span>
                    <span className="text-white">
                        {new Date(transaction.transaction_date).toLocaleDateString('id-ID')}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">Kadaluarsa:</span>
                    <span className="text-white">
                        {new Date(transaction.expiry_date).toLocaleDateString('id-ID')}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">Metode Bayar:</span>
                    <span className="text-white">{transaction.payment_method}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-white/20">
                    <span className="text-gray-400">Total:</span>
                    <span className="text-primary-300 font-bold text-lg">
                        Rp {transaction.amount.toLocaleString()}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TransactionCard;