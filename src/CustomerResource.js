import HttpClient from './HttpClient'
import Resource from './Resource'

/**
 * Handle Transaction resource actions
 */
class CustomerResource extends Resource {
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
