import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { ArrowLeft } from 'react-bootstrap-icons'; // Pastikan menginstall react-bootstrap-icons

function RestaurantDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate(); // Hook untuk navigasi
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch restaurant details based on the ID
        fetch(`https://restaurant-api.dicoding.dev/detail/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch restaurant details');
                }
                return response.json();
            })
            .then(data => {
                setRestaurant(data.restaurant);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching details:', error);
                setError(error.message);
                setLoading(false);
            });
    }, [id]);

    // Fungsi untuk kembali ke halaman utama
    const handleGoBack = () => {
        navigate('/'); // Kembali ke halaman utama
    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    if (error) {
        return <div className="text-center mt-5">Error: {error}</div>;
    }

    if (!restaurant) {
        return <div className="text-center mt-5">No restaurant found</div>;
    }

    return (
        <div className="container mt-4">
            {/* Tombol Back */}
            <div className="mb-4">
                <Button 
                    variant="outline-secondary" 
                    onClick={handleGoBack}
                    className="d-flex align-items-center"
                >
                    <ArrowLeft className="me-2" /> Back to Restaurants
                </Button>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <img 
                        src={`https://restaurant-api.dicoding.dev/images/large/${restaurant.pictureId}`} 
                        alt={restaurant.name} 
                        className="img-fluid rounded shadow"
                    />
                </div>
                <div className="col-md-6">
                    <h1 className="mb-3">{restaurant.name}</h1>
                    <div className="mb-3">
                        <strong>Location:</strong> {restaurant.city}, {restaurant.address}
                    </div>
                    <div className="mb-3">
                        <strong>Rating:</strong> {restaurant.rating}/5
                    </div>
                    <div className="mb-3">
                        <strong>Categories:</strong> {restaurant.categories.map(cat => cat.name).join(', ')}
                    </div>
                    <p className="text-muted">{restaurant.description}</p>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-md-6">
                    <h3 className="mb-3">Food Menu</h3>
                    <ul className="list-group">
                        {restaurant.menus.foods.map((food, index) => (
                            <li key={index} className="list-group-item">
                                <i className="bi bi-cup-hot me-2"></i>{food.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-6">
                    <h3 className="mb-3">Drink Menu</h3>
                    <ul className="list-group">
                        {restaurant.menus.drinks.map((drink, index) => (
                            <li key={index} className="list-group-item">
                                <i className="bi bi-cup-straw me-2"></i>{drink.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {restaurant.customerReviews && restaurant.customerReviews.length > 0 && (
                <div className="row mt-4">
                    <div className="col-12">
                        <h3 className="mb-3">Customer Reviews</h3>
                        {restaurant.customerReviews.map((review, index) => (
                            <div key={index} className="card mb-2 shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">{review.name}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{review.date}</h6>
                                    <p className="card-text">"{review.review}"</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default RestaurantDetailPage;