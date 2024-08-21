const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Track = require('../models/jukebox.js')

// all routes start with /tracks 

// gets all the tracks 
router.get('/', async (req, res) => {
    try {
        const foundTracks = await Track.find()
        res.status(200).json(foundTracks)
    } catch (error) {
        res.status(500).json( {error: error.message })
    }
})

// finds a single track based on the id 
router.get('/:trackId', async (req, res) => {
    try {
        
        if (!mongoose.isValidObjectId(req.params.trackId)) {
            res.status(404); 
            throw new Error('Track not found')
        }
        
        const foundTrack = await Track.findById(req.params.trackId)
        res.status(200).json(foundTrack)
    } catch (error) {
        if (res.statusCode === 404){
            res.json({error: error.message})
        } else {
            res.status(500).json( {error: error.message }) 
        }
    }
})

// create new track
router.post('/', async (req, res) => {
    try {
        const createdTrack = await Track.create(req.body)
        res.status(201).json(createdTrack)

    } catch (error) {
        res.status(500).json( {error: error.message })
    }
})



module.exports = router
