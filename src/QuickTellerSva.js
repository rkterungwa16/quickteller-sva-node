import BillersResource from './BillersResource'
/**
 * QuickTellerSva
 */
class QuickTellerSva {
  /**
   * @param {object} apiCredentials
   * @param {string} apiCredentials.apiSecret application secret
   * @param {string} apiCredentials.clientId application client id
   * @param {string} apiCredentials.terminalId application terminal id
   */
  constructor (apiCredentials) {
    this.BillersResoure = new BillersResource(apiCredentials)
  }
}

export default QuickTellerSva
