var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Goals = new Schema({
    fiscal_year: {type: Number, required: true, index: {unique: true}},
    months: {type: Object, required: false},
    yearly_totals: {type: Object, required: false}

});


module.exports = mongoose.model('Goals', Goals);
