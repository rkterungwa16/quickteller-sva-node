import HttpClient from './HttpClient'

/**
 * Handle actions related to funds
 */
class FundsResource {
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
   * Perform Quickteller Funds Transfer
   * @param {Object} requestPayload - request payload
   * @param {String} requestPayload.mac - Message authentication code,
   * for message integrity. Should be computed with SHA512 algorithm of
   * the string in Request MAC fields below
   * @param {Object} requestPayload.beneficiary
   * @param {String} requestPayload.beneficiary.lastname - Sender Last name
   * @param {String} requestPayload.beneficiary.othernames Other names of sender
   * @param {String} requestPayload.beneficiary.email - Email Address of Sender
   * (Mandatory if customer should receive notification)
   * @param {String} requestPayload.beneficiary.phone - Phone Number of sender
   * (Mandatory if customer should receive notification)
   * @param {String} requestPayload.initiatingEntityCode Client Entity Code issued by Interswitch
   * @param {Object} requestPayload.initiation
   * @param {Number} requestPayload.initiation.amount Amount to be sent to the beneficiary
   * in small denomination. Initiation Amount and Termination amount should be the same.
   * @param {Number} requesatPayload.initiation.channel See Payment channel in Appendix.
   * Channel must always be 7.
   * @param {String} requestPayload.initiation.currencyCode - ISO 4217 standard currency code
   * @param {String} requestPayload.initiation.paymentMethodCode Payment Method Code of where
   * transfer is being initiated from. InitiationPaymentMethodCodemust always be CA.
   * @param {Object} requestPayload.sender
   * @param {String} [requestPayload.sender.email] - Email Address of Sender (Mandatory if
   * customer should receive notification)
   * @param {String} requestPayload.sender.lastname - Sender last name
   * @param {String} requestPayload.sender.othernames - Other names of sender
   * @param {String} [requestPayload.sender.phone] - Phone Number of sender
   * (Mandatory if customer should receive notification)
   * @param {String} requestPayload.transferCode - Unique Transfer code generated
   * on Client’s system and sent in DoTransfer request. 4 digit transfer code
   * prefix will be provided by Interswitch.
   * @param {Object} requestPayload.termination
   * @param {Object} requestPayload.termination.accountReceivable
   * @param {String} requestPayload.termination.accountReceivable.accountNumber - Account
   * number/Card number of beneficiary. Account Number should be the 10 digits Nuban Account
   * Number of the beneficiary.
   * @param {String} requestPayload.termination.accountReceivable.accountType
   * @param {Number} requestPayload.termination.amount - Amount that will be received
   * by beneficiary in small denomination
   * @param {String} requestPayload.termination.countryCode - ISO 4217 standard country code
   * @param {String} requestPayload.termination.currencyCode - ISO 4217 standard currency code
   * @param {String} requestPayload.termination.entityCode
   * @param {String} requestPayload.termination.paymentMethodCode One of the payment
   * method codes for where the transfer is to be terminated.TerminatingPaymentMethodCode
   * must always be AC.
   * @param {String} [requestPayload.termination.entityLocationCode] Code of bank/agent
   * location where transfer should be collected, For cash receivable transfers only.
   * @param {String} [requesatPayload.termination.stateCode] State where the transfer
   * can be collected, For cash receivable transfers only.
   * @param {Object} [requesatPayload.cashRecievable]
   * @param {String} [requesatPayload.cashRecievable.typeCode] For cash receivable transfers only
   * @param {Object} [requestPayload.identification]
   * @param {String} [requestPayload.identification.typeCode] For cash receivable transfers only
   * @return {Promise} return funds transfer information
   */
  fundsTransfer (requestPayload) {
    const method = 'POST'
    const path = '/api/v2/quickteller/payments/transfers'
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

export default FundsResource
