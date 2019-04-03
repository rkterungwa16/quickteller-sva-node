import HttpClient from './HttpClient'

/**
 * Billers resource
 */
class BillerResource {
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
   * Retrieve billers based on the supplied search criteria
   * @return {Promise} return billers
   */
  getBillers () {
    const method = 'GET'
    const path = '/api/v2/quickteller/billers'
    return new Promise((resolve, reject) => {
      new HttpClient({
        clientId: this.clientId,
        apiSecret: this.apiSecret,
        terminalId: this.terminalId
      }, {
        protocol: this.protocol,
        hostname: this.hostname,
        path,
        method
      }).sendRequest()
        .then(response => resolve(response))
        .catch(err => reject(err))
    })
  }

  /**
   * Retrieve billers based on the supplied search criteria
   * @param {number} categoryId An ID of the category to be returned.
   * Please use a valid value returned from Get Categories API
   * @return {Promise} return billers by category
   */
  getBillersByCategory (categoryId) {
    const method = 'GET'
    const path = `/api/v2/quickteller/categorys/${categoryId}/billers`
    return new Promise((resolve, reject) => {
      new HttpClient({
        clientId: this.clientId,
        apiSecret: this.apiSecret,
        terminalId: this.terminalId
      }, {
        protocol: this.protocol,
        hostname: this.hostname,
        path,
        method
      }).sendRequest()
        .then(response => resolve(response))
        .catch(err => reject(err))
    })
  }

  /**
   * Retrieve billers based on the supplied search criteria
   * @param {number} billerId Unique per biller. Returned in GetBillers response
   * @return {Promise} return billers by category
   */
  getBillerPaymentItems (billerId) {
    const method = 'GET'
    const path = `/api/v2/quickteller/billers/${billerId}/paymentitems`
    return new Promise((resolve, reject) => {
      new HttpClient({
        clientId: this.clientId,
        apiSecret: this.apiSecret,
        terminalId: this.terminalId
      }, {
        protocol: this.protocol,
        hostname: this.hostname,
        path,
        method
      }).sendRequest()
        .then(response => resolve(response))
        .catch(err => reject(err))
    })
  }

  /**
   * Notify the biller of the payment
   * @param {object} requestPayload - request payload
   * @param {string} requestPayload.TerminalId - Terminal ID assigned by Interswitch
   * @param {string} requestPayload.paymentCode - Unique payment code retrieved from
   * GetBillerPaymentItems call
   * @param {string} requestPayload.customerId - Customer’s Unique Identifier
   * @param {string} [requestPayload.customerMobile] - Customer’s Mobile Number
   * @param {string} [requestPayload.customerEmail] - Customer's Email
   * @param {amount} requestPayload.amount - Amount Paid by customer. Amount should
   * be sent in lower denomination
   * @param {requestReference} requestPayload.requestReference - Unique requestReference
   * generated on Client’s system and sent in DoTransfer request. 4 digit
   * requestreference prefix will be provided by Interswitch.
   * @return {Promise} return payment information
   */
  sendBillPaymentAdvice (requestPayload) {
    const method = 'POST'
    const path = '/api/v2/quickteller/payments/advices'
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

export default BillerResource
