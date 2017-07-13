const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.post('/api/users', function (req, res) {
  const user = new User()
  user.name = req.body.name
  user.username = req.body.username
  user.password = req.body.password
  user.email = req.body.email
  user.save()
.then(function (user) {
  res.status(201).json({user: user})
})
  .catch(function (error) {
    res.status(422).json({
      error: error,
      user: user
    })
  })
})

module.exports = router
