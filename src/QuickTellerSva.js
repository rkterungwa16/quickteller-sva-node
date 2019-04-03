import BillerResource from './BillerResource'
import BillerCategoriesResource from './BillerCategoriesResource'
import BanksResource from './BanksResource'
import FundsResource from './FundsResource'
import TransactionResource from './TransactionResource'
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
    this.BillersResource = new BillerResource(apiCredentials)
    this.BillerCategoriesResource = new BillerCategoriesResource(apiCredentials)
    this.BanksResource = new BanksResource(apiCredentials)
    this.FundsResource = new FundsResource(apiCredentials)
    this.TransactionResource = new TransactionResource(apiCredentials)
  }
}

export default QuickTellerSva
