// Generated by CoffeeScript 1.4.0

/*
* This is the routing for the comments on edges / knownodes
*/


(function() {
  var baseController, commentModule,
    _this = this;

  commentModule = require('../../modules/comment');

  baseController = require('../baseController');

  module.exports = {
    options: {
      before: {
        create: [baseController.isLoggedIn],
        destroy: [baseController.isAdmin]
      }
    },
    show: function(request, response) {
      return module.exports.getRelatedComments(request, response);
    },
    create: function(request, response) {
      var cb, comment;
      cb = baseController.callBack(response);
      comment = new commentModule(request.user);
      return comment.createNewComment(request.body.comment, request.body.originalObject.id, cb);
    },
    getRelatedComments: function(request, response) {
      var cb, comment, commentsOfId;
      cb = baseController.callBack(response);
      comment = new commentModule(request.user);
      commentsOfId = request.params.comment.replace(/:/g, '');
      return comment.getAllCommentsOfKnownodeID(commentsOfId, cb);
    }
  };

}).call(this);