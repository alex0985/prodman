var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ProductSchema = new Schema({
  productname:   { type: String, required: true, unique: true },
  eancode:        { type: Number },
  manufacturer:   { type: String },
  quantity:       { type: Number },
  purchaseprice:  { type: Number },
  sellingprice:   { type: Number }
});
module.exports = mongoose.model('product', ProductSchema);
