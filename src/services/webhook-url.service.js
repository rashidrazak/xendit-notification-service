'use strict'

const WebhookUrlModel = require('../models/webhook-url.model')

class WebhookUrlService extends WebhookUrlModel {
  constructor(option = {}) {
    const modelCfg = {
      queryLimit: option.queryLimit,
      ...(option.ddbConf, {ddbConf: option.ddbConf})
    }

    super(modelCfg)
  }

  async create(requestedBy, webhookUrl) {
    const newWebhookUrl = {webhookUrl}
    newWebhookUrl.merchantId = requestedBy
    return super.create(requestedBy, newWebhookUrl)
  }
}

module.exports = WebhookUrlService
