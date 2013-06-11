// Generated by CoffeeScript 1.6.2
/*
* This is the routing/controller for the knownodes.
* It uses /modules/knownode.js for implementing its actions.
*/


(function() {
  var baseController, bot, client, commentModule, getFirstItem, getFirstParagraph, getInternalLinks, knownodeModule, makeLinksToUrls, makeWikipediaUrl, relationModule, txtwiki;

  knownodeModule = require('../../modules/knownode');

  relationModule = require('../../modules/relation');

  baseController = require('../baseController');

  commentModule = require('../../modules/comment');

  txtwiki = require('../../bundledModules/txtwiki.js');

  bot = require('../../bundledModules/nodemw');

  client = new bot({
    server: 'en.wikipedia.org',
    path: '/w',
    debug: false
  });

  getFirstParagraph = function(title, callback) {
    return client.getArticle(title, function(data) {
      return callback(txtwiki.parseWikitext(data.substring(0, data.indexOf("\n\n"))));
    });
  };

  getFirstItem = function(object) {
    var key, value;

    for (key in object) {
      value = object[key];
      return value;
    }
  };

  makeWikipediaUrl = function(title) {
    return "http://en.wikipedia.org/wiki/" + title.replace(" ", "_");
  };

  makeLinksToUrls = function(modKnownode, nodeId, urls, relationData, reverseDirection) {
    var url, _i, _len, _results;

    if (reverseDirection == null) {
      reverseDirection = false;
    }
    _results = [];
    for (_i = 0, _len = urls.length; _i < _len; _i++) {
      url = urls[_i];
      _results.push(modKnownode.getKnownodeByUrl(url, function(err, otherNode) {
        var endNodeId, startNodeId;

        if (!otherNode) {
          return;
        }
        startNodeId = reverseDirection ? otherNode.KN_ID : nodeId;
        endNodeId = reverseDirection ? nodeId : otherNode.KN_ID;
        console.log("Creating link from node " + startNodeId + " to " + endNodeId);
        return modKnownode.createNewRelationBetweenExistingNodes(startNodeId, relationData, endNodeId, function(err, link) {
          if (err) {
            return console.log("Error creating link", err);
          } else {
            return console.log("Created link", link.KN_ID);
          }
        });
      }));
    }
    return _results;
  };

  getInternalLinks = function(title, callback) {
    var query;

    query = {
      action: 'query',
      prop: 'links',
      titles: title,
      pllimit: 5000
    };
    return client.api.call(query, function(data) {
      var link, titles;

      titles = (function() {
        var _i, _len, _ref, _results;

        _ref = getFirstItem(data.pages).links;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          link = _ref[_i];
          _results.push(link.title);
        }
        return _results;
      })();
      return callback(titles);
    });
  };

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
    },
    wikinode: function(request, response) {
      var RELATION_DATA, cb, modKnownode, url;

      RELATION_DATA = {
        connectionType: "Wikipedia Link"
      };
      cb = baseController.callBack(response);
      modKnownode = new knownodeModule(request.user);
      console.log("Making wikinode");
      console.log("title = ", request.body.title);
      url = makeWikipediaUrl(request.body.title);
      console.log("url = ", url);
      return modKnownode.getKnownodeByUrl(url, function(err, existingNode) {
        if (existingNode) {
          console.log("Wikinode already exists");
          return cb(null, existingNode);
        }
        return getFirstParagraph(request.body.title, function(description) {
          var knownodeData;

          knownodeData = {
            title: request.body.title,
            bodyText: description,
            url: url
          };
          console.log("wikinode data", knownodeData);
          return modKnownode.createNewKnownode(knownodeData, function(err, newNode) {
            getInternalLinks(request.body.title, function(linkedTitles) {
              var linkedTitle, urls;

              urls = (function() {
                var _i, _len, _results;

                _results = [];
                for (_i = 0, _len = linkedTitles.length; _i < _len; _i++) {
                  linkedTitle = linkedTitles[_i];
                  _results.push(makeWikipediaUrl(linkedTitle));
                }
                return _results;
              })();
              return makeLinksToUrls(modKnownode, newNode.KN_ID, urls, RELATION_DATA);
            });
            client.getExternalLinks(request.body.title, function(externalLinks) {
              var link, urls;

              urls = (function() {
                var _i, _len, _results;

                _results = [];
                for (_i = 0, _len = externalLinks.length; _i < _len; _i++) {
                  link = externalLinks[_i];
                  if (link["*"].indexOf("http://") === 0) {
                    _results.push(link["*"]);
                  }
                }
                return _results;
              })();
              return makeLinksToUrls(modKnownode, newNode.KN_ID, urls, RELATION_DATA);
            });
            client.getBacklinks(request.body.title, function(backlinks) {
              var link, urls;

              urls = (function() {
                var _i, _len, _results;

                _results = [];
                for (_i = 0, _len = backlinks.length; _i < _len; _i++) {
                  link = backlinks[_i];
                  _results.push(makeWikipediaUrl(link.title));
                }
                return _results;
              })();
              return makeLinksToUrls(modKnownode, newNode.KN_ID, urls, RELATION_DATA, true);
            });
            return cb(null, newNode);
          });
        });
      });
    }
  };

}).call(this);
