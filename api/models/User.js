/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
var _ = require('lodash');  
const bcrypt = require('bcrypt-nodejs');
// var _super = require('sails-auth/api/models/User');
var moment = require("moment-timezone")

// _.merge(exports, _super);  
_.merge(exports, {
attributes: {
    username: {
      type: 'string',
      required: true,
      unique: true
    },
    firstname: {
      type: 'string',
      required: true,
      // unique: true
    },
    lastname: {
      type: 'string',
      required: true
    },
    password: {
      type: 'string',
      required: true
    }
  },
  customToJSON: function() {
     return _.omit(this, ['password'])
  },
  beforeCreate: function(user, cb){
    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(user.password, salt, null, function(err, hash){
        if(err) return cb(err);
        user.password = hash;
        return cb();
      });
    });
  }
});
