import HttpClient from './HttpClient'

/**
 * Handle actions related to funds
 */
class FundsResource {
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
   * Perform Quickteller Funds Transfer
   * @param {object} requestPayload - request payload
   * @param {string} requestPayload.mac - Message authentication code,
   * for message integrity. Should be computed with SHA512 algorithm of
   * the string in Request MAC fields below
   * @param {object} requestPayload.beneficiary
   * @param {string} requestPayload.beneficiary.lastname - Sender Last name
   * @param {string} requestPayload.beneficiary.othernames Other names of sender
   * @param {string} requestPayload.beneficiary.email - Email Address of Sender
   * (Mandatory if customer should receive notification)
   * @param {string} requestPayload.beneficiary.phone - Phone Number of sender
   * (Mandatory if customer should receive notification)
   * @param {string} requestPayload.initiatingEntityCode Client Entity Code issued by Interswitch
   * @param {object} requestPayload.initiation
   * @param {number} requestPayload.initiation.amount Amount to be sent to the beneficiary
   * in small denomination. Initiation Amount and Termination amount should be the same.
   * @param {number} requesatPayload.initiation.channel See Payment channel in Appendix.
   * Channel must always be 7.
   * @param {string} requestPayload.initiation.currencyCode - ISO 4217 standard currency code
   * @param {string} requestPayload.initiation.paymentMethodCode Payment Method Code of where
   * transfer is being initiated from. InitiationPaymentMethodCodemust always be CA.
   * @param {object} requestPayload.sender
   * @param {string} [requestPayload.sender.email] - Email Address of Sender (Mandatory if
   * customer should receive notification)
   * @param {string} requestPayload.sender.lastname - Sender last name
   * @param {string} requestPayload.sender.othernames - Other names of sender
   * @param {string} [requestPayload.sender.phone] - Phone Number of sender
   * (Mandatory if customer should receive notification)
   * @param {string} requestPayload.transferCode - Unique Transfer code generated
   * on Client’s system and sent in DoTransfer request. 4 digit transfer code
   * prefix will be provided by Interswitch.
   * @param {object} requestPayload.termination
   * @param {object} requestPayload.termination.accountReceivable
   * @param {string} requestPayload.termination.accountReceivable.accountNumber - Account
   * number/Card number of beneficiary. Account Number should be the 10 digits Nuban Account
   * Number of the beneficiary.
   * @param {string} requestPayload.termination.accountReceivable.accountType
   * @param {number} requestPayload.termination.amount - Amount that will be received
   * by beneficiary in small denomination
   * @param {string} requestPayload.termination.countryCode - ISO 4217 standard country code
   * @param {string} requestPayload.termination.currencyCode - ISO 4217 standard currency code
   * @param {string} requestPayload.termination.entityCode
   * @param {string} requestPayload.termination.paymentMethodCode One of the payment
   * method codes for where the transfer is to be terminated.TerminatingPaymentMethodCode
   * must always be AC.
   * @param {string} [requestPayload.termination.entityLocationCode] Code of bank/agent
   * location where transfer should be collected, For cash receivable transfers only.
   * @param {string} [requesatPayload.termination.stateCode] State where the transfer
   * can be collected, For cash receivable transfers only.
   * @param {object} [requesatPayload.cashRecievable]
   * @param {string} [requesatPayload.cashRecievable.typeCode] For cash receivable transfers only
   * @param {object} [requestPayload.identification]
   * @param {string} [requestPayload.identification.typeCode] For cash receivable transfers only
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
