const mongoose = require('mongoose')

const activitySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  stats: [{
    number: {
      type: Number
    },
    date: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }]
})

const Activity = mongoose.model('Activity', activitySchema)

module.exports = Activity
