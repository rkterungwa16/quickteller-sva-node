
/**
 * Quickteller SVA Resource
 */
class Resource {
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
}

export default Resource
