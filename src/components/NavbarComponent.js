// NavbarComponent.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CardComponent from './CardComponent';

function RestaurantNavbar() {
    const [restaurants, setRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [openNow, setOpenNow] = useState(false);
    const [ratingFilter, setRatingFilter] = useState(null);
    const [cityFilter, setCityFilter] = useState('All');

    useEffect(() => {
        fetch('https://restaurant-api.dicoding.dev/list')
            .then(response => response.json())
            .then(data => {
                setRestaurants(data.restaurants);
                setFilteredRestaurants(data.restaurants);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleOpenNowFilter = () => {
        setOpenNow(!openNow);
    };

    const handleRatingFilter = (rating) => {
        setRatingFilter(rating);
    };

    const handleCityFilter = (selectedCity) => {
        setCityFilter(selectedCity);
    };

    const applyFilters = () => {
        let filtered = [...restaurants];

        // Filter by city
        if (cityFilter !== 'All') {
            filtered = filtered.filter(restaurant => restaurant.city === cityFilter);
        }

        // Filter by open now
        if (openNow) {
            const currentTime = new Date();
            const currentHours = currentTime.getHours().toString().padStart(2, '0');
            const currentMinutes = currentTime.getMinutes().toString().padStart(2, '0');
            const currentTimeString = `${currentHours}:${currentMinutes}`;

            filtered = filtered.filter(restaurant => 
                restaurant.openHours && 
                currentTimeString >= restaurant.openHours.start && 
                currentTimeString <= restaurant.openHours.end
            );
        }

        // Filter by rating range
        if (ratingFilter) {
            let minRating, maxRating;
            if (ratingFilter === 1) {
                minRating = 0; maxRating = 1;
            } else if (ratingFilter === 2) {
                minRating = 1; maxRating = 2;
            } else if (ratingFilter === 3) {
                minRating = 2; maxRating = 3;
            } else if (ratingFilter === 4) {
                minRating = 3; maxRating = 4;
            } else if (ratingFilter === 5) {
                minRating = 4; maxRating = 5;
            }

            filtered = filtered.filter(restaurant => restaurant.rating >= minRating && restaurant.rating < maxRating);
        }

        setFilteredRestaurants(filtered);
    };

    useEffect(() => {
        applyFilters();
    }, [openNow, ratingFilter, cityFilter]);

    const clearAllFilters = () => {
        setOpenNow(false);
        setRatingFilter(null);
        setCityFilter('All');
        setFilteredRestaurants(restaurants);
    };

    const cities = ['All', ...new Set(restaurants.map(restaurant => restaurant.city))];

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#" onClick={clearAllFilters}>Restaurant</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#" onClick={clearAllFilters}>All Restaurants</Nav.Link>
                            <NavDropdown title="City" id="city-nav-dropdown">
                                {cities.map((city) => (
                                    <NavDropdown.Item 
                                        key={city} 
                                        href="#" 
                                        onClick={() => handleCityFilter(city)}
                                    >
                                        {city}
                                    </NavDropdown.Item>
                                ))}
                            </NavDropdown>
                            <NavDropdown title="Rating" id="rating-nav-dropdown">
                                <NavDropdown.Item href="#" onClick={() => handleRatingFilter(1)}>0 - 1 Star</NavDropdown.Item>
                                <NavDropdown.Item href="#" onClick={() => handleRatingFilter(2)}>1 - 2 Stars</NavDropdown.Item>
                                <NavDropdown.Item href="#" onClick={() => handleRatingFilter(3)}>2 - 3 Stars</NavDropdown.Item>
                                <NavDropdown.Item href="#" onClick={() => handleRatingFilter(4)}>3 - 4 Stars</NavDropdown.Item>
                                <NavDropdown.Item href="#" onClick={() => handleRatingFilter(5)}>4 - 5 Stars</NavDropdown.Item>
                            </NavDropdown>
                            <Form.Check 
                                type="checkbox"
                                label="Open Now"
                                checked={openNow}
                                onChange={handleOpenNowFilter}
                                style={{ marginLeft: '10px', marginTop: '10px' }}
                            />
                        </Nav>
                        <Button variant="outline-secondary" onClick={clearAllFilters} style={{ marginLeft: 'auto' }}>Clear All</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                {filteredRestaurants.map((restaurant) => (
                    <CardComponent
                        key={restaurant.id}
                        restaurantId={restaurant.id}
                        restaurantName={restaurant.name}
                        restaurantRating={restaurant.rating}
                        restaurantImage={`https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId}`}
                        restaurantDescription={restaurant.description}
                        restaurantCity={restaurant.city}
                    >
                        <Link to={`/restaurant/${restaurant.id}`}>
                            <Button variant="primary">Learn More</Button>
                        </Link>
                    </CardComponent>
                ))}
            </div>
        </div>
    );
}

export default RestaurantNavbar;
