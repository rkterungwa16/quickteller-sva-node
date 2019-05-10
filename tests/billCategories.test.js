import chai from 'chai'
import nock from 'nock'

import QuickTellerSva from '../src'
import credentials from './credentialFixtures'

const { expect } = chai

describe('Bill Categories Resources', () => {
  describe('Get Biller Categories', () => {
    nock('https://sandbox.interswitchng.com/api/v2')
      .get('/quickteller/categorys')
      .reply(200, [{
        categorys: {
          categoryid: '1',
          categoryname: 'Utility Bills',
          categorydescription: 'Pay your utility bills here'
        }
      }])

    it('Should retrieve all the biller category types', () => {
      const quickTellerSva = new QuickTellerSva(credentials)
      quickTellerSva
        .BillerCategoriesResource
        .getBillerCategories()
        .then((response) => {
          expect(response.data[0].categorys.categoryid).to.equal('1')
        })
    })
  })
})
