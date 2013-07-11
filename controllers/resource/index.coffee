baseController = require('../baseController')
resourceDAO = require('../../dao/resourceDAO')

module.exports =

  show: (request, response) ->
    dao = new resourceDAO request.user
    cb = baseController.callBack response
    id = request.params.resource
    dao.read(id, cb)

  create: (request, response) ->
    dao = new resourceDAO request.user
    cb = baseController.callBack response
    dao.create(request.body, cb)

  update: (request, response) ->
    dao = new resourceDAO request.user
    cb = baseController.callBack response
    id = request.params.resource
    dao.update(id, request.body, cb)

  destroy: (request, response) ->
    dao = new resourceDAO request.user
    cb = baseController.callBack response
    id = request.params.resource
    dao.delete(id, cb)