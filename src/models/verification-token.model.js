'use strict'

const _ = require('lodash')
const {DynamoDB, IDTypes, types} = require('../utilities/utils')

const {ddbTable} = require('../config/config')

/**
 * VerificationToken Class
 */
class VerificationToken {
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
    const verificationTokenId = await this.db.guid(IDTypes.VERIFICATION_TOKEN)
    obj.PK = obj.SK = verificationTokenId
    obj.createdBy = obj.updatedBy = requestedBy
    obj.typeName = types.TypeName.VERIFICATION_TOKEN

    await this.db.put(obj)
    return obj
  }
}

module.exports = VerificationToken