import http from 'http'
import https from 'https'

/**
 * Make requests
 */
class HttpClient {
  /**
   * @param {Object} apiCredentials - Quickteller API credentials
   * @param {string} apiCredentials.apiKey - Quickteller API key
   * @param {string} apiCredentials.apiSecret - Quickteller API secret
   * @param {Object} options - Additional options
   * @param {string} options.protocol - request protocol
   * @param {string} options.hostname - quickteller SVA api base url
   * @param {string} options.path quickteller SVA api resource path
   * @param {string} options.method request method
   * @param {object} options.requestPayload payload for requests that are not GET
   */
  constructor (apiCredentials, options) {
    this.apiCredentials = apiCredentials
    this.options = options
    this.headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiCredentials.apiSecret}`
    }
  }

  /**
   * @return {Promise} response
   */
  sendRequest () {
    return new Promise((resolve, reject) => {
      const req = https.request({
        protocol: this.options.protocol,
        hostname: this.options.hostname,
        method: this.options.method.toUpperCase(),
        path: this.options.path
      }, (res) => {
        const status = res.statusCode
        if (status === 200 || status === 201) {
          let body = ''
          res.on('data', (data) => {
            body += data
          })
          return res.on('end', () => {
            const parsed = JSON.parse(body)
            return resolve(parsed)
          })
        }
        let err = ''
        res.on('data', (data) => {
          err += data
        })
        return res.on('end', () => {
          const parsed = JSON.parse(err)
          const quicktellerSvaError = new Error()
          quicktellerSvaError.statusCode = status
          quicktellerSvaError.message = parsed.message
          return reject(quicktellerSvaError)
        })
      })
      req.on('error', (e) => {
        reject(e)
      })
      if (this.options.requestPayload) {
        req.write(this.options.requestPayload)
      }
      req.end()
    })
  }
}

export default HttpClient
