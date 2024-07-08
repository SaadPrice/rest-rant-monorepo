const express = require('express');
const router = express.Router();
const Place = require('../models/place');
const Comment = require('../models/comment');

// Create a new place
router.post('/', async (req, res) => {
    console.log('POST /places route hit');
    
    if (!req.body.pic) {
        req.body.pic = 'http://placekitten.com/400/400';
    }
    if (!req.body.city) {
        req.body.city = 'Anytown';
    }
    if (!req.body.state) {
        req.body.state = 'USA';
    }

    try {
        const place = await Place.create(req.body);
        res.json(place);
    } catch (err) {
        console.error('Error in POST /places:', err);
        if (err.name === 'ValidationError') {
            let message = '';
            for (let field in err.errors) {
                message += `${err.errors[field].message} `;
            }
            res.status(400).json({ message });
        } else {
            res.status(500).json({ message: 'An error occurred' });
        }
    }
});

// Get all places
router.get('/', async (req, res) => {
    console.log('GET /places route hit');
    try {
        const places = await Place.find();
        res.json(places);
    } catch (err) {
        console.error('Error in GET /places:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get a specific place by ID
router.get('/:placeId', async (req, res) => {
    console.log(`GET /places/${req.params.placeId} route hit`);
    try {
        const place = await Place.findById(req.params.placeId).populate('comments');
        if (!place) {
            res.status(404).json({ message: 'Place not found' });
        } else {
            res.json(place);
        }
    } catch (err) {
        console.error(`Error in GET /places/${req.params.placeId}:`, err);
        res.status(500).json({ message: 'An error occurred' });
    }
});

// Update a place by ID
router.put('/:placeId', async (req, res) => {
    console.log(`PUT /places/${req.params.placeId} route hit`);
    try {
        const place = await Place.findByIdAndUpdate(req.params.placeId, req.body, { new: true, runValidators: true });
        if (!place) {
            res.status(404).json({ message: 'Place not found' });
        } else {
            res.json(place);
        }
    } catch (err) {
        console.error(`Error in PUT /places/${req.params.placeId}:`, err);
        if (err.name === 'ValidationError') {
            let message = '';
            for (let field in err.errors) {
                message += `${err.errors[field].message} `;
            }
            res.status(400).json({ message });
        } else {
            res.status(500).json({ message: 'An error occurred' });
        }
    }
});

// Delete a place by ID
router.delete('/:placeId', async (req, res) => {
    console.log(`DELETE /places/${req.params.placeId} route hit`);
    try {
        const place = await Place.findByIdAndDelete(req.params.placeId);
        if (!place) {
            res.status(404).json({ message: 'Place not found' });
        } else {
            res.json(place);
        }
    } catch (err) {
        console.error(`Error in DELETE /places/${req.params.placeId}:`, err);
        res.status(500).json({ message: 'An error occurred' });
    }
});

module.exports = router;

