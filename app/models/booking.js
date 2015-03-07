var mongoose = require('mongoose');

var Schema = mongoose.Schema;

/**
 * Getters
 */
var getTags = function (tags) {
  return tags.join(',');
};

/**
 * Setters
 */

var setTags = function (tags) {
  return tags.split(',');
};


var BookingSchema = new Schema(
  {
    image: {
      cdnUri: String,
      files: []
    },
    star:{type : Number, default : 5,},
    title: {type : String, default : '', trim : true},
    tags: {type: [], get: getTags, set: setTags},
    //上货时间
    createdAt  : {type : Date, default : Date.now}
  }
);




BookingSchema.statics = {
  /**
   * List booking
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */
  list: function (options, cb) {
    this.find({})
      .sort({'createdAt': -1}) // sort by date
      .limit(options.perPage)
      .skip(options.perPage * options.page)
      .exec(cb);
  }
};

console.log('model regist');
module.exports = mongoose.model('Booking', BookingSchema);
