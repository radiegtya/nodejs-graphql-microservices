const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/cocote', {useNewUrlParser: true})

module.exports = mongoose