import BillerResource from './BillerResource'
import BillerCategoriesResource from './BillerCategoriesResource'
import BanksResource from './BanksResource'
import FundsResource from './FundsResource'
import TransactionResource from './TransactionResource'
import CustomerResource from './CustomerResource'

/**
 * QuickTellerSva
 */
class QuickTellerSva {
  /**
   * @param {Object} apiCredentials
   * @param {String} apiCredentials.apiSecret application secret
   * @param {String} apiCredentials.clientId application client id
   * @param {String} apiCredentials.terminalId application terminal id
   */
  constructor (apiCredentials) {
    this.BillersResource = new BillerResource(apiCredentials)
    this.BillerCategoriesResource = new BillerCategoriesResource(apiCredentials)
    this.BanksResource = new BanksResource(apiCredentials)
    this.FundsResource = new FundsResource(apiCredentials)
    this.TransactionResource = new TransactionResource(apiCredentials)
    this.CustomerResource = new CustomerResource(apiCredentials)
  }
}

export default QuickTellerSva
