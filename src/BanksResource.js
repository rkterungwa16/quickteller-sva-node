import HttpClient from './HttpClient'

/**
 * Banks resource
 */
class BanksResource {
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
        method,
        headers: bankDetails
      }).sendRequest()
        .then(response => resolve(response))
        .catch(err => reject(err))
    })
  }
}

export default BanksResource
