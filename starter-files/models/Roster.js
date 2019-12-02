const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const rosterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: 'A title is required'
  },
  players: [{
    type: mongoose.Schema.Types.ObjectId,
    refs: 'Players'
  }]
});
