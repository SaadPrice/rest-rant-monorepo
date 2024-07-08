const React = require('react');

function show({ place }) {
    let rating = 'No ratings yet';
    if (place.comments.length) {
        let sumRatings = place.comments.reduce((tot, c) => {
            return tot + c.stars;
        }, 0);
        let averageRating = Math.round(sumRatings / place.comments.length);
        let stars = '';
        for (let i = 0; i < averageRating; i++) {
            stars += '⭐';
        }
        rating = (
            <h3>
                {stars} ({averageRating} stars)
            </h3>
        );
    }

    return (
        <div>
            <h1>{place.name}</h1>
            <h2>{place.showEstablished()}</h2>
            {rating}
            {/* Other place details */}
        </div>
    );
}

module.exports = show;
