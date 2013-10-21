OwnedEntities = require './OwnedEntities'
Type = require './../model/Type'
ResourceValidator = require './../model/validation/ResourceValidator'
Resource = require './../model/Resource'
Connection = require './../model/Connection'
Error = require '../error/Error'
User = require './../model/User'

module.exports = class Resources extends OwnedEntities

  @getNodeType: -> Type.RESOURCE

  @wrap: (node) -> new Resource(node)

  @searchByKeyword: (userQuery, _) ->
    nodes = []
    cypherQuery = """
                  START results=node(*)
                  Where has(results.title)
                  and results.nodeType="kn_Post"
                  and results.title =~ {regex}
                  RETURN results
                  """
    regex = '(?i).*' + userQuery + '.*'
    params = {regex: regex}
    results = @DB.query(cypherQuery, params, _)
    for item in results
      nodes.push item.results.data
    nodes

  @findByUrl: (url, _) ->
    @findByTextProperty('url', url, _)

  @findTripletsByResourceId: (id, user, _) ->
    nodes = []

    if (user)
      userNodeId = user.node.id
    else
      userNodeId = 0

    query = """
            START resource=node({resourceNodeId}), user=node(#{userNodeId})
            MATCH (resource) -[:RELATED_TO]- (connection) -[:RELATED_TO]- (endResource),
            endResource -[?:CREATED_BY]- (endResourceCreator),
            (otherConnections)-[?:RELATED_TO]-(endResource),
            (connection) -[?:VOTED_UP]- (upvotes),
            (downvotes) -[?:VOTED_DOWN]- (connection),
            (connection) -[:CREATED_BY]- (connectionCreator),
            (user) -[hasVotedUp?:VOTED_UP]-> (connection),
            (user) -[hasVotedDown?:VOTED_DOWN]-> (connection),
            (connection) -[?:COMMENT_OF]- (comments)
            WHERE endResource <> resource
            AND otherConnections <> connection
            RETURN resource, endResource, endResourceCreator, connection, connectionCreator,
            count(distinct comments) AS commentCount,
            count(distinct otherConnections) AS endResourceConnectionCount,
            count(distinct connection)-1 AS startResourceConnectionCount,
            count(distinct upvotes) AS upVoteCount,
            count(distinct downvotes) AS downVoteCount,
            hasVotedUp, hasVotedDown
            """
    resource = @find(id, _)
    params =
      resourceNodeId: resource.node.id

    results = @DB.query(query, params, _)
    for item in results
      toPush =
        upvotes: item.upVoteCount
        downvotes: item.downVoteCount
        userUpvoted: item.hasVotedUp
        userDownvoted: item.hasVotedDown
        startResource: item.resource.data
        endResource: item.endResource.data
        connection: item.connection.data
        commentCount: item.commentCount
      toPush.startResource.connectionCount = item.startResourceConnectionCount
      toPush.endResource.connectionCount = item.endResourceConnectionCount
      toPush.endResource.creator = item.endResourceCreator?.data?
      toPush.connection.creator = item.connectionCreator.data
      if toPush.connection.status is "deleted"
        toPush.connection.creator.firstName = "deleted"
        toPush.connection.creator.lastName = " "
        toPush.connection.creator.KN_ID = "deleted"
        toPush.connection.creator.dateOfBirth = "deleted"
        toPush.connection.creator.email = "deleted"
        toPush.connection.creator.email = "deleted"
        toPush.connection.creator.password = "deleted"
      nodes.push toPush
    nodes