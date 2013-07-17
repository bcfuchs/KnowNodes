Neo4j = require 'neo4j'
DBConf = require '../config/DB.conf'
Error = require '../error/Error'

module.exports = class NodeWrapper

  ###
        CLASS METHODS
  ###

  @DB: new Neo4j.GraphDatabase(DBConf.getDBURL('neo4j'))

  @getNodeType: ->
    throw Error.notImplemented('NodeWrapper.getNodeType()')

  @getValidator: ->
    throw Error.notImplemented('NodeWrapper.getValidator()')

  @wrap: (node) ->
    throw Error.notImplemented('NodeWrapper.wrap()')

  @create: (data, _) ->
    data.KN_ID = @GUID()
    data.nodeType = @getNodeType()
    data.__CreatedOn__ = Date.now()
    created = @wrap(@DB.createNode(data))
    created.save _
    created.index _
    return created

  @find: (id, _) ->
    @wrap(@findNodeById(id, _))

  @findNodeById: (id, _) ->
    node = @DB.getIndexedNode(@getNodeType(), 'KN_ID', id, _)
    if not node?
      throw Error.entityNotFound(@getNodeType(), id)
    else
      node

  # Generates a new Globally Unique ID
  @GUID: () ->
    # TODO Guarantee Uniqueness
    "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace /[xy]/g, (c) ->
      r = Math.random() * 16 | 0
      v = (if c is "x" then r else (r & 0x3 | 0x8))
      v.toString 16

  ###
        INSTANCE METHODS
  ###

  constructor: (@node) ->
    if not @node?
      throw Error.illegalArgument(@node, 'NodeWrapper.constructor()')

  getId: ->
    @node.data['KN_ID']

  save: (_) ->
    @validate()
    @node.save _
    @

  update: (newData, _) ->
    oldData = @node._data.data
    # Make sure creation date is not overwritten
    newData.__CreatedOn__ = oldData.__CreatedOn__
    @node._data.data = newData
    @save _
    @

  delete: (_) ->
    @node.delete _

  index: (_) ->
    @node.index(@node.data['nodeType'], 'KN_ID', @node.data['KN_ID'], _)

  ###
        METHODS TO IMPLEMENT
  ###

  validate: ->
    throw Error.notImplemented('NodeWrapper.getValidator()')