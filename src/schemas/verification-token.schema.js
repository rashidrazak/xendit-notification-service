'use strict'

/**
 * This schema is mainly used for data validation
 */

const joi = require('@hapi/joi')

class VerificationTokenSchema {
  constructor() {
    this.merchantId = joi.string()
    this.verificationToken = joi.string()
  }

  async validateCreateVerificationToken(values) {
    const schema = joi.object().keys({
      merchantId: this.merchantId.required(),
      verificationToken: this.verificationToken.required()
    }).required()

    const result = joi.validate(values, schema)
    return result
  }
}

module.exports = VerificationTokenSchema
