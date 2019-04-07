import HttpClient from './HttpClient'

/**
 * Biller Categories resource
 */
class BillerCategoriesResource {
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
   * Retrieve all the biller category types
   * @return {Promise} return  biller categories
   */
  getBillerCategories () {
    const method = 'GET'
    const path = '/api/v2/quickteller/categorys'
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

export default BillerCategoriesResource
