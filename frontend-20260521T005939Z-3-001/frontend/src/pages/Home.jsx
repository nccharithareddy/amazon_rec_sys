import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import { productAPI, recommendationAPI } from '../services/api';
import './Home.css';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const res = await productAPI.getAllProducts();
      setProducts(res.data);

      if (isLoggedIn) {
        const recRes = await recommendationAPI.getRecommendations();
        setRecommendations(recRes.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query, category) => {
    try {
      const res = await productAPI.searchProducts(query, category);
      setProducts(res.data);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="home-page">
      <SearchBar onSearch={handleSearch} />
      
      {isLoggedIn && recommendations.length > 0 && (
        <section className="recommendations-section">
          <h2>Recommended For You</h2>
          <div className="products-grid">
            {recommendations.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      )}

      <section className="products-section">
        <h2>All Products</h2>
        <div className="products-grid">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}