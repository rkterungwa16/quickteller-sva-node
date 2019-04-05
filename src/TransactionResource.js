import HttpClient from './HttpClient'

/**
 * Handle Transaction resource actions
 */
class TransactionResource {
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
   * Retrieve the status of a transaction
   * @param {String} requestReferencevalue The request reference passed in the
   * 'SendBillPaymentAdvice' method or the transfer code
   * passed in the 'DoTransfer' method
   * @return {Promise} return  transaction information
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
   * @param {Object} requestPayload - request payload
   * @param {String} requestPayload.paymentCode - The Payment Code that identifies
   * the biller. Please see Get Biller response GetBillerPaymentItems call
   * @param {String} requestPayload.customerId - Customer ID e.g. smart card number
   * meter number
   * @param {String} [requestPayload.customerMobile] - Customer's Mobile Number
   * @param {String} [requestPayload.customerEmail] - Customer's Email
   * @param {Number} [requestPayload.amount] - Amount
   * be sent in lower denomination
   * @param {String} requestPayload.pageFlowValues - This is required
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

  /**
   * Perform Quickteller Payment Transaction
   * @param {Object} requestPayload - request payload
   * @param {String} requestPayload.pinData - Encrypted PIN Block
   * @param {String} requestPayload.secureData - Other Transaction sensitve
   * data e.g. Card, CVV, Exp Date
   * @param {String} [requestPayload.msisdn] - Customer Mobile phone
   * @param {String} requestPayload.transactionRef - Transaction reference
   * returned during Bill Payment inquiry call
   * @param {Number} requestPayload.amount - Transaction amount in minor denomination
   * be sent in lower denomination
   * @param {String} requestPayload.cardBin - The first 11 number of the Card Number
   * @return {Promise} return payment information
   */
  sendPaymentTransaction (requestPayload) {
    const method = 'POST'
    const path = '/api/v2/quickteller/transactions'
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
