'use strict'

const AWS = require('aws-sdk')

// DynamoDB options fallback values
const DEFAULT_ZERO_PADDING_LENGTH = 10
const DEFAULT_QUERY_LIMIT = 25

class DynamoDB {
  constructor(option = {}) {
    if (!option.tableName) throw new Error('Missing tableName. tableName is required')

    this.tableName = option.tableName
    this.paddingLength = option.paddingLength || DEFAULT_ZERO_PADDING_LENGTH
    this.queryLimit = option.queryLimit || DEFAULT_QUERY_LIMIT

    if (option.documentClientCfg) this.documentClientCfg = option.documentClientCfg
    this.dynamoDB = new AWS.DynamoDB.DocumentClient(this.documentClientCfg)
  }

  async guid(idType) {
    const key = _key(idType)
    if (!key) throw new Error(`${idType} not available!`)

    const params = {
      TableName: process.env.DYNAMODB_COUNTER_TABLE,
      Key: {type: key},
      UpdateExpression: 'SET #counter=#counter + :val, #updatedAt=:updatedAt',
      ExpressionAttributeNames: {'#counter': 'counter', '#updatedAt': 'updatedAt'},
      ExpressionAttributeValues: {':val': 1, ':updatedAt': new Date().toISOString() },
      ReturnValues: 'UPDATED_NEW'
    }

    const result = await this.dynamoDB.update(params).promise()
    const counter = ((result || {}).Attributes || {}).counter

    let prefix = idType, paddingLength = this.paddingLength
    return prefix + counter.toString().padStart(paddingLength, '0')
  }

  async put(value = {}, option = {}) {
    try {
      const params = _createPutParams(value)
      params.TableName = this.tableName
      // console.log(`[ddb - put] params: ${JSON.stringify(params, null, 2)}`)

      return await this.dynamoDB.put(params).promise()
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

/**
 * Creating dynamodb param object
 * @private
 */
const _createPutParams = (value) => {
  let timestamp = new Date().toISOString()
  let datetime = {
    createdAt: value && value.createdAt ? value.createdAt: timestamp,
    updatedAt: value && value.updatedAt ? value.updatedAt: timestamp
  }
  let params = {
    Item: {...value, ...datetime}
  }
  return params
}

/**
 * Collections of ID Types
 * @private
 */
const _key = (idType) => {
  const IdTypes = {
    MERC: 'MERCHANT',
    USER: 'USER',
    VERF: 'VERIFICATION_TOKEN',
    WURL: 'WEBHOOK_URL',
    NOTF: 'NOTIFICATION_MSG'
  }

  return IdTypes[idType]
}

module.exports = DynamoDB