import crypto from 'crypto'

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
   * @param {String} apiCredentials.apiSecret - application secret
   * @param {String} apiCredentials.clientId - application client id
   * @param {String} apiCredentials.terminalId - application terminal id
   * @param {String} apiCredentials.environment - application environment
   * @param {String} [apiCredentials.hostname] - web server host name
   */
  constructor (apiCredentials) {
    this.BillersResource = new BillerResource(apiCredentials)
    this.BillerCategoriesResource = new BillerCategoriesResource(apiCredentials)
    this.BanksResource = new BanksResource(apiCredentials)
    this.FundsResource = new FundsResource(apiCredentials)
    this.TransactionResource = new TransactionResource(apiCredentials)
    this.CustomerResource = new CustomerResource(apiCredentials)
    this.apiCredentials = apiCredentials
  }

  /**
   * @param {Object} airtimeInfo
   * @param {String} airtimeInfo.billerName airtime telecoms provider
   * @param {String} airtimeInfo.customerPhonenumber phonenumber of airtime recipient
   * @param {Number} airtimeInfo.amount amount of airtime
   *
   * @return {Object} response information
   */
  async buyAirtime (airtimeInfo) {
    const {
      billerName,
      customerPhonenumber,
      amount
    } = airtimeInfo
    const {
      terminalId
    } = this.apiCredentials

    const requestReference = crypto.randomBytes(256).toString('hex')
    const billerListForCategory = await this.BillersResource.getBillersByCategory(4)


    if (!billerListForCategory) {
      return new Error('Could not get billers by category')
    }

    const billerInfo = billerListForCategory.data.filter(biller => biller.billername === billerName)
    const billerPaymentItem = await this.BillersResource.getBillerPaymentItems(billerInfo.billerid)

    if (!billerPaymentItem) {
      return new Error('Could not get biller payment item')
    }
    const {
      paymentCode
    } = billerPaymentItem.data.paymentitems[0]
    const paymentEnquiry = await this.TransactionResource.paymentEnquiry({
      paymentCode,
      customerId: customerPhonenumber,
      customerMobile: customerPhonenumber,
      amount
    })

    if (!paymentEnquiry) {
      return new Error('Could not make payment enquiry')
    }

    const sendBillPaymentAdvice = await this.BillersResource.sendBillPaymentAdvice({
      paymentCode,
      TerminalId: terminalId,
      customerId: customerPhonenumber,
      amount,
      requestReference
    })

    if (!sendBillPaymentAdvice) {
      return new Error('Bill payment advice not successfully sent')
    }
    const queryTransaction = await this.TransactionResource
      .queryTransaction(requestReference)

    if (!queryTransaction) {
      return new Error('Query transaction not successful')
    }
    return {
      paymentAdviceResponse: sendBillPaymentAdvice.data,
      queryTransactionResponse: queryTransaction.data
    }
  }
}

export default QuickTellerSva
