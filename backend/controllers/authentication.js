const router = require('express').Router()
const db = require("../models")
const bcrypt = require('bcrypt')

const { User } = db

router.post('/', async (req, res) => {
    try {
        let user = await User.findOne({
            where: { 
                email: req.body.email          
            }
        })

        if (!user || !await bcrypt.compare(req.body.password, user.passwordDigest)) {
            return res.status(404).json({ 
                message: `Could not find a user with the provided username and password` 
            })
        }

        res.json({ user })

    } catch (error) {
        console.error(error)
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router
