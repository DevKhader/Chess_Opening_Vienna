const mongoose = require('mongoose');

const variationSchema = new mongoose.Schema({
  title: String,
  moves: [String]
});

module.exports = mongoose.model('Variation', variationSchema);
