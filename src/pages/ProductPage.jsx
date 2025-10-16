import { useEffect, useState } from 'react';
import { Search, Filter } from 'lucide-react';
import useProductStore from '../store/productStore';
import ProductCard from '../components/ProductCard';

const ProductsPage = () => {
    const { 
        products, 
        filteredProducts, 
        loading, 
        fetchProducts, 
        fetchCategories, 
        setSearchQuery 
    } = useProductStore();

    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, [fetchProducts, fetchCategories]);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchInput(value);
        setSearchQuery(value);
    };

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-heading font-bold text-white mb-4">
                        Pilih Paket Internet
                    </h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                        Temukan paket internet terbaik sesuai kebutuhan Anda dengan harga terjangkau
                    </p>
                </div>

                <div className="glass-card p-6 mb-8">
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                        <div className="relative flex-1 w-full lg:max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Cari paket internet..."
                            value={searchInput}
                            onChange={handleSearch}
                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                        />
                        </div>
                    </div>
                </div>

                {loading ? (
                <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
                    <p className="text-gray-300 mt-4">Memuat produk...</p>
                </div>
                ) : (
                <>
                    <div className="flex justify-between items-center mb-6">
                        <p className="text-gray-300">
                            Menampilkan {filteredProducts.length} dari {products.length} produk
                        </p>
                    </div>

                    {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    ) : (
                    <div className="text-center py-12 glass-card">
                        <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-white text-xl font-semibold mb-2">
                            Produk tidak ditemukan
                        </h3>
                        <p className="text-gray-300">
                            Coba ubah kata kunci pencarian atau filter kategori
                        </p>
                    </div>
                    )}
                </>
                )}
            </div>
        </div>
    );
};

export default ProductsPage;