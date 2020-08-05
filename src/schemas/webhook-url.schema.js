'use strict'

/**
 * This schema is mainly used for data validation
 */

const joi = require('@hapi/joi')

class WebhookUrlSchema {
  constructor() {
    this.merchantId = joi.string()
    this.webhookUrl = joi.string()
  }

  async validateCreateWebhookUrl(values) {
    const schema = joi.object().keys({
      merchantId: this.merchantId.required(),
      webhookUrl: this.webhookUrl.required()
    }).required()

    const result = joi.validate(values, schema)
    return result
  }
}

module.exports = WebhookUrlSchema
