'use strict'

const DynamoDB = require('./dynamodb/dynamodb')
const types = require('./types/types')
const {IDTypes} = require('./id/id')
const {formRestResponse} = require('./restful/restful')

module.exports = {
  DynamoDB,
  types,
  IDTypes,
  formRestResponse
}
