import HttpClient from './HttpClient'

/**
 * Handle Transaction resource actions
 */
class CustomerResource {
  /**
   * @param {Object} apiCredentials
   * @param {String} apiCredentials.apiSecret application secret
   * @param {String} apiCredentials.clientId application client Id
   * @param {String} apiCredentials.terminalId application terminal id
   * @param {String} apiCredentials.environment - Application environment
   */
  constructor (apiCredentials) {
    this.apiSecret = apiCredentials.apiSecret
    this.clientId = apiCredentials.clientId
    this.terminalId = apiCredentials.terminalId
    this.hostname = `${
      apiCredentials.environment === 'production' ? 'saturn' : 'sandbox'
    }.interswitchng.com`
    this.protocol = 'https:'
  }

  /**
   * Notify the biller of the payment
   * @param {Object} requestPayload - request payload
   * @param {Array.<{paymentCode: String, customerId: String}>} requestPayload.customers -
   * Contains the array for customer
   * Contains Unique payment code for a biller
   * Contains Customer’s Unique Identifier
   * @return {Promise} return customer information
   */
  customerValidation (requestPayload) {
    const method = 'POST'
    const path = '/api/v2/quickteller/customers/validations'
    return new Promise((resolve, reject) => {
      new HttpClient({
        clientId: this.clientId,
        apiSecret: this.apiSecret,
        terminalId: this.terminalId
      }, {
        protocol: this.protocol,
        hostname: this.hostname,
        path,
        method,
        requestPayload
      }).sendRequest()
        .then(response => resolve(response))
        .catch(err => reject(err))
    })
  }
}

export default CustomerResource
