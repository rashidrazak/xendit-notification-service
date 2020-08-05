'use strict'

const VerificationTokenModel = require('../models/verification-token.model')

class VerificationTokenService extends VerificationTokenModel {
  constructor(option = {}) {
    const modelCfg = {
      queryLimit: option.queryLimit,
      ...(option.ddbConf, {ddbConf: option.ddbConf})
    }

    super(modelCfg)
  }

  async create(requestedBy, verificationToken) {
    const newVerificationToken = {verificationToken}
    newVerificationToken.merchantId = requestedBy
    return super.create(requestedBy, newVerificationToken)
  }
}

module.exports = VerificationTokenService
