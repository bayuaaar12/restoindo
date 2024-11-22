import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function CardComponent({ 
    restaurantId, 
    restaurantName, 
    restaurantRating, 
    restaurantImage, 
    restaurantDescription, 
    restaurantCity 
}) {
    const navigate = useNavigate();

    const truncateDescription = (text, wordLimit) => {
        if (!text) return ''; 
        const words = text.split(' ');
        return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : text;
    };

    const handleLearnMore = () => {
        // Navigasi ke halaman detail dengan ID restoran
        navigate(`/restaurant/${restaurantId}`);
    };

    return (
        <Card style={{ width: '25rem', margin: '15px', height: '28rem' }}>
            <Card.Img 
                variant="top" 
                src={restaurantImage} 
                style={{ height: '200px', objectFit: 'cover' }}
            />
            <Card.Body>
                <Card.Title>{restaurantName}</Card.Title>
                <Card.Text>
                    City: {restaurantCity} <br />
                    Rating: {restaurantRating} <br />
                    Description: {truncateDescription(restaurantDescription, 20)}
                </Card.Text>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button 
                        variant="primary" 
                        onClick={handleLearnMore}
                        style={{ backgroundColor: '#00008B', borderColor: '#00008B' }}
                    >
                        Learn More
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default CardComponent;