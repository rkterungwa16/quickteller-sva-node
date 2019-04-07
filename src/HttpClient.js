import https from 'https'
import crypto from 'crypto'
import nonce from 'nonce'


/**
 * Make requests
 */
class HttpClient {
  /**
   * @param {Object} apiCredentials - Quickteller API credentials
   * @param {String} apiCredentials.clientId - Quickteller API client Id
   * @param {String} apiCredentials.apiSecret - Quickteller API secret
   * @param {String} apiCredentials.terminalId - Quickteller App terminal id
   * @param {Object} options - Additional options
   * @param {String} options.protocol - request protocol
   * @param {Object} [options.https] - node https library
   * @param {String} options.hostname - quickteller SVA api base url
   * @param {String} options.path quickteller SVA api resource path
   * @param {String} options.method request method
   * @param {Object} options.requestPayload payload for requests that are not GET
   * @param {Object} options.headers additional headers to existing headers
   */
  constructor (apiCredentials, options) {
    this.apiCredentials = apiCredentials
    this.https = options.https || https
    this.options = options
    this.headers = {
      'Content-Type': 'application/json'
    }
    this.generateRequestHeaders = this.generateRequestHeaders.bind(this)
  }

  /**
   * @return {Promise} response
   */
  sendRequest () {
    return new Promise((resolve, reject) => {
      const req = this.https.request({
        protocol: this.options.protocol,
        hostname: this.options.hostname,
        method: this.options.method.toUpperCase(),
        path: this.options.path,
        headers: this.generateRequestHeaders()
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
          quicktellerSvaError.message = parsed.errors[0].message
          return reject(quicktellerSvaError)
        })
      })
      req.on('error', (e) => {
        reject(e)
      })
      if (this.options.requestPayload) {
        req.write(JSON.stringify(this.options.requestPayload))
      }
      req.end()
    })
  }

  /**
   * @return {Object} request header
   */
  generateRequestHeaders () {
    const {
      method,
      protocol,
      path,
      hostname,
      headers
    } = this.options
    const {
      clientId,
      apiSecret
    } = this.apiCredentials
    const Authorization = `InterswitchAuth ${Buffer.from(this.apiCredentials.clientId).toString('base64')}`
    const Nonce = nonce()()
    const Timestamp = Math.floor(Date.now() / 1000)
    const SignatureMethod = 'SHA1'
    const terminalID = this.apiCredentials.terminalId
    const percentEncodeUrl = encodeURIComponent(`${protocol}//${hostname}${path}`)
    const signatureContent = `${method}&${percentEncodeUrl}&${Timestamp}&${Nonce}&${clientId}&${apiSecret}`
    const Signature = crypto.createHash('sha1').update(signatureContent).digest('base64')

    if (headers) {
      return Object.assign(this.headers, headers, {
        Signature,
        Authorization,
        Nonce,
        Timestamp,
        SignatureMethod,
        terminalID
      })
    }
    return Object.assign(this.headers, {
      Signature,
      Authorization,
      Nonce,
      Timestamp,
      SignatureMethod,
      terminalID
    })
  }
}

export default HttpClient
