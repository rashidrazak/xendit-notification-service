'use strict'

function formRestResponse(statusCode, body, option={}) {
  let headers = option.headers
  const response = {
    statusCode,
    body: JSON.stringify(body),
    ...(option.isBase64Encoded && { isBase64Encoded: option.isBase64Encoded}),
    ...(headers && Object.keys(headers).length > 0 && { headers })
  }
  return response
}

module.exports = {
  formRestResponse
}
