const express = require('express')
const router = express.Router()
const Activity = require('../models/Activity')

router.get('/api/activities', function (req, res) {
  Activity.find({userId: req.user._id})
  .then(function (activities) {
    res.json({activity: activities})
  })
})

router.get('/api/activities/:id', function (req, res) {
  Activity.findOne({_id: req.params.id})
  .then(function (activity) {
    res.json({activity: activity})
  })
})

router.post('/api/activities', function (req, res) {
  const activity = new Activity()
  activity.userId = req.user._id
  activity.title = req.body.title
  activity.save()
.then(function (activity) {
  res.status(201).json({activity: activity})
})
  .catch(function (error) {
    res.status(422).json({
      error: error,
      activity: activity
    })
  })
})

router.post('/api/activities/:id/stats', function (req, res) {
  Activity.findOne({_id: req.params.id})
  .then(function (activity) {
    let dateFound = false
    let position = 0
    for (let i = 0; i < activity.stats.length; i++) {
      if (activity.stats[i].date === req.body.date) {
        dateFound = true
        position = i
      }
    } if (dateFound) {
      activity.stats[position].number = req.body.number
    } else {
      activity.stats.push({
        number: req.body.number,
        date: req.body.date
      })
    }
    activity.save()
  })
.then(function (activity) {
  res.status(200).json({activity: activity})
})
  .catch(function (error) {
    console.log(error)
    res.status(422).json({
      error: error
    })
  })
})

router.put('/api/activities/:id', function (req, res) {
  Activity.findOne({_id: req.params.id})
  .then(function (activity) {
    activity.title = req.body.title
    activity.save()
  })
  .then(function (activity) {
    res.json({activity: activity})
  }).catch(function (error) {
    console.log(error)
    res.status(422).json({
      error: error
    })
  })
})

router.delete('/api/activities/:id', function (req, res) {
  Activity.deleteOne({_id: req.params.id})
  .then(function (activity) {
    res.status(200).json({activity: activity})
  })
})

router.delete('/api/:activityid/stats/:id', function (req, res) {
  Activity.update({_id: req.params.activityid},
    {$pull: {stats: { _id: req.params.id }}
    })
  .then(function (activity) {
    res.status(200).json({activity: activity})
  })
})

module.exports = router
