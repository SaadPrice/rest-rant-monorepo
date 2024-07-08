const React = require('react');

function edit({ place }) {
    return (
        <form action={`/places/${place._id}?_method=PUT`} method="POST">
            <div>
                <label htmlFor="name">Name</label>
                <input id="name" name="name" required defaultValue={place.name} />
            </div>
            <div>
                <label htmlFor="city">City</label>
                <input id="city" name="city" required defaultValue={place.city} />
            </div>
            <div>
                <label htmlFor="state">State</label>
                <input id="state" name="state" required defaultValue={place.state} />
            </div>
            <div>
                <label htmlFor="cuisines">Cuisines</label>
                <input id="cuisines" name="cuisines" required defaultValue={place.cuisines} />
            </div>
            <div>
                <label htmlFor="founded">Founded Year</label>
                <input id="founded" name="founded" required defaultValue={place.founded} />
            </div>
            <button type="submit">Save</button>
        </form>
    );
}

module.exports = edit;
