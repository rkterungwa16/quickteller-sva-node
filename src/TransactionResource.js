import HttpClient from './HttpClient'

/**
 * Handle Transaction resource actions
 */
class TransactionResource {
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
   * Retrieve the status of a transaction
   * @param {string} requestReferencevalue The request reference passed in the
   * 'SendBillPaymentAdvice' method or the transfer code passed in the 'DoTransfer'
   * method
   * @return {Promise} return  biller categories
   */
  queryTransaction (requestReferencevalue) {
    const method = 'GET'
    const path = `/api/v2/quickteller/transactions?requestreference=${requestReferencevalue}`
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
}

export default TransactionResource
