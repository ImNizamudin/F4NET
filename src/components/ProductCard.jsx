import { Star, ShoppingCart, Zap, Clock, Wifi } from 'lucide-react';
import useCartStore from '../store/cartStore';

const ProductCard = ({ product }) => {
    const addItem = useCartStore((state) => state.addItem);

    const handleAddToCart = () => {
        addItem(product);
    };

    const getOperatorColor = (operator) => {
        const colors = {
        'Telkomsel': 'from-red-500 to-red-600',
        'XL Axiata': 'from-purple-500 to-purple-600',
        'Indosat': 'from-yellow-500 to-yellow-600',
        'Smartfren': 'from-blue-500 to-blue-600',
        'default': 'from-gray-500 to-gray-600'
        };
        return colors[operator] || colors.default;
    };

    return (
        <div className="glass-card-dark p-6 hover:scale-105 transition-all duration-300 group shine-effect">
            <div className="flex justify-between items-start mb-4">
                <div className="flex space-x-2">
                {product.popular && (
                    <span className="bg-gradient-to-r from-white to-gray-300 text-gray-900 text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
                    🔥 Popular
                    </span>
                )}
                {product.bestseller && (
                    <span className="bg-gradient-to-r from-primary-600 to-accent-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
                    ⭐ Bestseller
                    </span>
                )}
                </div>
                {product.discount > 0 && (
                <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
                    -{product.discount}%
                </span>
                )}
            </div>

            <div className="relative h-40 mb-4 rounded-2xl overflow-hidden group">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className={`absolute top-3 left-3 bg-gradient-to-r ${getOperatorColor(product.operator)} text-white text-xs px-2 py-1 rounded-lg font-semibold shadow-lg`}>
                    {product.operator}
                </div>
            </div>

            <div className="space-y-3">
                <h3 className="text-white font-semibold text-lg line-clamp-2 group-hover:text-gray-200 transition-colors">
                    {product.name}
                </h3>

                <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                        <Wifi className="w-4 h-4" />
                        <span>{product.network}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <Zap className="w-4 h-4" />
                        <span>{product.speed}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{product.validity}</span>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-white font-semibold">{product.rating}</span>
                    </div>
                    <span className="text-gray-400 text-sm">
                        ({product.review_count} reviews)
                    </span>
                </div>

                <div className="flex flex-wrap gap-2">
                    {product.features.slice(0, 2).map((feature, index) => (
                        <span
                        key={index}
                        className="bg-white/10 text-gray-300 text-xs px-2 py-1 rounded-lg border border-white/10"
                        >
                        {feature}
                        </span>
                    ))}
                </div>

                <div className="flex justify-between items-center text-sm bg-white/5 rounded-lg p-3 border border-white/10">
                    <span className="text-white font-semibold text-lg">
                        {product.data_quota}
                    </span>
                    <span className="text-gray-300 bg-black/20 px-2 py-1 rounded">
                        {product.validity}
                    </span>
                </div>

                <div className="flex justify-between items-center pt-2">
                    <div className="flex items-center space-x-2">
                        <span className="text-white font-bold text-xl">
                        Rp {product.price.toLocaleString()}
                        </span>
                        {product.original_price > product.price && (
                        <span className="text-gray-400 line-through text-sm">
                            Rp {product.original_price.toLocaleString()}
                        </span>
                        )}
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className="premium-button !py-2 !px-4 text-sm group"
                    >
                        <ShoppingCart className="w-4 h-4 transition-transform group-hover:scale-110" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;