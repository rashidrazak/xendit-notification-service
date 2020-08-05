'use strict'

const {formRestResponse} = require('../utilities/utils')

const VerificationTokenService = require('../services/verification-token.service')
const VerificationTokenSchema = require('../schemas/verification-token.schema')

const verificationTokenSvc = new VerificationTokenService()
const verificationTokenSchema = new VerificationTokenSchema()

const api = {}

api.create = async function(data) {
  // console.log(`[verification-token.api - create] arguments: ${JSON.stringify(arguments, null, 2)}`)

  const {requestedBy, verificationToken} = data
  try {
    await verificationTokenSchema.validateCreateVerificationToken({
      merchantId: requestedBy,
      verificationToken
    })

    const result = await verificationTokenSvc.create(requestedBy, verificationToken)
    // console.log(`[verification-token.api - create] result: ${JSON.stringify(result, null, 2)}`)
    return result
  } catch (e) {
    throw new Error(e)
  }
}

module.exports = api
