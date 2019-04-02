import BillerResource from './BillerResource'
import BillerCategoriesResource from './BillerCategoriesResource'
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
    this.BillersResoure = new BillerResource(apiCredentials)
    this.BillerCategoriesResource = new BillerCategoriesResource(apiCredentials)
  }
}

export default QuickTellerSva
