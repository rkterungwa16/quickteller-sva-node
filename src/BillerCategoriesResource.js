import HttpClient from './HttpClient'
import Resource from './Resource'

/**
 * Biller Categories resource
 */
class BillerCategoriesResource extends Resource {
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
