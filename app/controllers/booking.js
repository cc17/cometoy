
var mongoose = require('mongoose')
var Booking = mongoose.model('Booking')

exports.list = function(req, res, next){

  var page = (req.param('page') > 0 ? req.param('page') : 1) - 1;
  var perPage = 10;
  var options = {
    perPage: perPage,
    page: page
  };
  var errorResponse = {
    code:500,
    success:false,
    data:[]
  };

  Booking.list(options, function (err, bookings) {
    if (err) return res.json(errorResponse);

    Booking.count().exec(function (err, count) {
      if (err) return res.json(errorResponse);

      return res.json({
        code:200,
        data:{
          list:bookings,
          pageInfo:{
            total: count,
            curPage:page,
            perPage:perPage
          }
        },
        success:true
      });
    });
  });
};