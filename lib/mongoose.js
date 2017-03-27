var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tableData');
module.exports = mongoose;
