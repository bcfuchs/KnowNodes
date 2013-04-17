// Generated by CoffeeScript 1.6.1

/*
* This is the routing/controller for the knownodes.
* It uses /modules/knownode.js for implementing its actions.
*/


(function() {
  var baseController, commentModule, knownodeModule, relationModule;

  knownodeModule = require('../../modules/knownode');

  relationModule = require('../../modules/relation');

  baseController = require('../baseController');

  commentModule = require('../../modules/comment');

  module.exports = {
    show: function(request, response) {
      var cb, id, modKnownode;
      cb = baseController.callBack(response);
      modKnownode = new knownodeModule(request.user);
      id = request.params.knownode.replace(/:/g, '');
      return modKnownode.getKnownodeByKnownodeId(id, cb);
    },
    create: function(request, response) {
      var cb, modKnownode, originalPostId;
      cb = baseController.callBack(response);
      modKnownode = new knownodeModule(request.user);
      if (request.body.knownodeRelation && request.body.knownodeRelation.reversedDirection && (request.body.existingNode != null)) {
        originalPostId = request.body.originalPostId.replace(/:/g, '');
        return modKnownode.createNewReversedRelationBetweenExistingNodes(originalPostId, request.body.knownodeRelation, request.body.existingNode, cb);
      } else if (request.body.knownodeRelation && (request.body.existingNode != null)) {
        originalPostId = request.body.originalPostId.replace(/:/g, '');
        return modKnownode.createNewRelationBetweenExistingNodes(originalPostId, request.body.knownodeRelation, request.body.existingNode, cb);
      } else if (request.body.knownodeRelation && request.body.knownodeRelation.reversedDirection) {
        originalPostId = request.body.originalPostId.replace(/:/g, '');
        return modKnownode.createNewKnownodeWithReversedRelation(originalPostId, request.body.knownodeRelation, request.body.knownodeForm, cb);
      } else if (request.body.knownodeRelation) {
        originalPostId = request.body.originalPostId.replace(/:/g, '');
        return modKnownode.createNewKnownodeWithRelation(originalPostId, request.body.knownodeRelation, request.body.knownodeForm, cb);
      } else {
        return modKnownode.createNewKnownode(request.body.knownodeForm, cb);
      }
    },
    destroy: function(request, response) {
      var cb, id, modKnownode;
      cb = baseController.callBack(response);
      modKnownode = new knownodeModule(request.user);
      id = request.params.knownode.replace(/:/g, '');
      return modKnownode.destroy(id, cb);
    },
    search: function(request, response) {
      var cb;
      return cb = baseController.callBack(response);
    },
    getUserKnownodes: function(request, response) {
      var cb, modKnownode;
      cb = baseController.callBack(response);
      modKnownode = new knownodeModule(request.user);
      return modKnownode.getUserKnownodes(cb);
    },
    getRelatedKnownodes: function(request, response) {
      var cb, id, modKnownode;
      cb = baseController.callBack(response);
      modKnownode = new knownodeModule(request.user);
      id = request.params.knownode.replace(/:/g, '');
      return modKnownode.getRelatedKnownodesToKnowNodeId(id, cb);
    },
    getRelatedComments: function(request, response) {
      var cb, comment, id;
      cb = baseController.callBack(response);
      comment = new commentModule(request.user);
      id = request.params.knownode.replace(/:/g, '');
      return comment.getAllComments(id, cb);
    },
    getNodesByKeyword: function(request, response) {
      var cb, id, modKnownode;
      cb = baseController.callBack(response);
      modKnownode = new knownodeModule(request.user);
      id = request.params.knownode.replace(/:/g, '');
      return modKnownode.getNodesToKeyword(id, cb);
    }
  };

}).call(this);
