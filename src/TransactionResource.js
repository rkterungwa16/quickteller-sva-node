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
   * 'SendBillPaymentAdvice' method or the transfer code
   * passed in the 'DoTransfer' method
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

  /**
   * Quickteller Payment Inquiry
   * @param {object} requestPayload - request payload
   * @param {string} requestPayload.paymentCode - The Payment Code that identifies
   * the biller. Please see Get Biller response GetBillerPaymentItems call
   * @param {string} requestPayload.customerId - Customer ID e.g. smart card number
   * meter number
   * @param {string} [requestPayload.customerMobile] - Customer's Mobile Number
   * @param {string} [requestPayload.customerEmail] - Customer's Email
   * @param {amount} [requestPayload.amount] - Amount
   * be sent in lower denomination
   * @param {string} requestPayload.pageFlowValues - This is required
   * when you are sending a funds transfer trasaction. e.
   * BankId:16|DestinationAccountNumber:0221149201|
   * DestinationAccountType:10|Amount:60000|ReciepientName:GBOLAHAN MUSBAU SUBAIR
   * @return {Promise} return payment information
   */
  paymentEnquiry (requestPayload) {
    const method = 'POST'
    const path = '/api/v2/quickteller/transactions/inquirys'
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

export default TransactionResource
