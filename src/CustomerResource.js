import HttpClient from './HttpClient'

/**
 * Handle Transaction resource actions
 */
class CustomerResource {
  /**
   * @param {object} apiCredentials
   * @param {string} apiCredentials.apiSecret application secret
   * @param {string} apiCredentials.clientId application client Id
   * @param {string} apiCredentials.terminalId application terminal id
   */
  constructor (apiCredentials) {
    this.apiSecret = apiCredentials.apiSecret
    this.clientId = apiCredentials.clientId
    this.terminalId = apiCredentials.terminalId
    this.hostname = 'sandbox.interswitchng.com'
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
