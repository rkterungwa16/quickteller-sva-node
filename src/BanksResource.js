import HttpClient from './HttpClient'

/**
 * Banks resource
 */
class BanksResource {
  /**
   * @param {Object} apiCredentials
   * @param {String} apiCredentials.apiSecret application secret
   * @param {String} apiCredentials.clientId application client Id
   * @param {String} apiCredentials.terminalId application terminal id
   * @param {String} apiCredentials.environment - Application environment
   * @param {String} apiCredentials.hostname - web server host name
   */
  constructor (apiCredentials) {
    this.apiSecret = apiCredentials.apiSecret
    this.clientId = apiCredentials.clientId
    this.terminalId = apiCredentials.terminalId
    this.hostname = !apiCredentials.hostname ? `${
      apiCredentials.environment === 'production' ? 'saturn' : 'sandbox'
    }.interswitchng.com` : apiCredentials.hostname
    this.protocol = 'https:'
  }

  /**
   * @return {Promise} return banks
   */
  getBanks () {
    const method = 'GET'
    const path = '/api/v2/quickteller/configuration/fundstransferbanks'
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
   * @param {Object} bankDetails customer's bank information
   * @param {String} bankDetails.bankCode customer's bank code
   * @param {String} bankDetails.accountId customer's account id
   * @return {Promise} return banks
   */
  nameEnquiry (bankDetails) {
    const method = 'GET'
    const path = '/api/v1/nameenquiry/banks/accounts/names'
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
        headers: bankDetails
      }).sendRequest()
        .then(response => resolve(response))
        .catch(err => reject(err))
    })
  }
}

export default BanksResource
