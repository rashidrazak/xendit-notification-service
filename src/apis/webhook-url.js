'use strict'

const {formRestResponse} = require('../utilities/utils')

const WebhookUrlService = require('../services/webhook-url.service')
const WebhookUrlSchema = require('../schemas/webhook-url.schema')

const webhookUrlSvc = new WebhookUrlService()
const webhookUrlSchema = new WebhookUrlSchema()

const api = {}

api.create = async function(data) {
  // console.log(`[webhook-url.api - create] arguments: ${JSON.stringify(arguments, null, 2)}`)

  const {requestedBy, webhookUrl} = data
  try {
    await webhookUrlSchema.validateCreateWebhookUrl({
      merchantId: requestedBy,
      webhookUrl
    })

    const result = await webhookUrlSvc.create(requestedBy, webhookUrl)
    // console.log(`[webhook-url.api - create] result: ${JSON.stringify(result, null, 2)}`)
    return result
  } catch (e) {
    throw new Error(e)
  }
}

module.exports = api
