import chai from 'chai'
import nock from 'nock'

import QuickTellerSva from '../src'
import credentials from './credentialFixtures'

const { expect } = chai

describe('Customer Resources', () => {
  describe('Customer validation', () => {
    nock('https://sandbox.interswitchng.com/api/v2', { allowUnmocked: true })
      .post('/quickteller/customers/validations',
        {
          customers: [
            {
              customerId: '0000000001',
              paymentCode: '10401'
            }
          ]
        })
      .reply(200, {
        Customers: [{
          paymentCode: '10401',
          customerId: '0000000001',
          responseCode: '90000',
          fullName: 'Test Test'
        }]
      })

    it('Should notify the biller of the payment', () => {
      const quickTellerSva = new QuickTellerSva(credentials)
      quickTellerSva
        .CustomerResource
        .customerValidation({
          customers: [
            {
              customerId: '0000000001',
              paymentCode: '10401'
            }
          ]
        })
        .then((response) => {
          expect(response.data.Customers[0].paymentCode).to.equal('10401')
        })
    })
  })
})
