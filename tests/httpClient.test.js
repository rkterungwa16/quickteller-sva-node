import chai from 'chai'
import nock from 'nock'

import HttpClient from '../src/HttpClient'
import credentials from './credentialFixtures'
import options from './optionsFixtures'

const { expect } = chai

describe('Http Client object', () => {
  describe('Http Client generate header', () => {
    it('Should return header', () => {
      const header = new HttpClient(credentials, options)
        .generateRequestHeaders()
      expect(header).to.be.a('object')
    })
  })

  describe('Http Client send request', () => {
    nock('https://sandbox.interswitchng.com/api/v2')
      .get('/quickteller/billers')
      .reply(200, {
        categoryname: 'Insurance',
        categorydescription: 'Insurance Payments',
        billerid: '900',
        billername: 'Gurantee Trust Assurance',
      })

    it('Should return the correct category name', () => {
      new HttpClient(credentials, Object.assign(options, {
        path: '/api/v2/quickteller/billers',
        method: 'GET'
      }))
        .sendRequest()
        .then((response) => {
          expect(response.categoryname).to.equal('Insurance')
        })
    })
  })
})
