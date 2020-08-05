'use strict'

const _ = require('lodash')
const {DynamoDB, IDTypes, types} = require('../utilities/utils')

const {ddbTable} = require('../config/config')

/**
 * WebhookUrl Class
 */
class WebhookUrl {
  constructor(options = {}) {
    const tableName = ddbTable.notificationTable
    if (!tableName) throw new Error('tableName is empty or invalid!')

    const config = {
      tableName,
      ...(options.ddbConf && {documentClientCfg: options.ddbConf})
    }

    this.db = new DynamoDB(config)
  }

  async create(requestedBy, obj) {
    const webhookUrlId = await this.db.guid(IDTypes.WEBHOOK_URL)
    obj.PK = obj.SK = webhookUrlId
    obj.status = 'inactive'
    obj.createdBy = obj.updatedBy = requestedBy
    obj.typeName = types.TypeName.WEBHOOK_URL

    await this.db.put(obj)
    return obj
  }
}

module.exports = WebhookUrl