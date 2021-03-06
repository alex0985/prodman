var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
  username: { type: String, lowercase: true, required: true, unique: true },
  password: { type: String, required: true },
  email:    { type: String, lowercase: true, required: true, unique: true  }
});

UserSchema.pre('save',function(next){
  var user = this;
  bcrypt.hash(user.password, null, null, function(err,hash){
    if(err) return nex(err);
    user.password = hash;
    next();
  });
});

module.exports = mongoose.model('user', UserSchema);
