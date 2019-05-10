import chai from 'chai'
import nock from 'nock'

import QuickTellerSva from '../src'
import credentials from './credentialFixtures'

const { expect } = chai

describe('Customer Resources', () => {
  describe('Customer validation', () => {
    nock('https://sandbox.interswitchng.com/api/v2', { allowUnmocked: true })
      .post('/quickteller/payments/transfers',
        {
          mac: '9f4e4f53c57be63e1f08d8f07a7bc1a9461e4a7d5304043daa1ef54bd727b6cde148f4fbfc5e2ad8c4a60f78dfa76304de671fbeb70657b1628f14b6b6baa5e1',
          beneficiary: {
            lastname: 'Anari',
            othernames: 'Sammy'
          },
          initiatingEntityCode: 'XXT',
          initiation: {
            amount: '100000',
            channel: '7',
            currencyCode: '566',
            paymentMethodCode: 'CA'
          },
          sender: {
            email: 'simon.mokhele@hellogroup.co.za',
            lastname: 'Testing',
            othernames: 'Test',
            phone: '0732246413'
          },
          termination: {
            accountReceivable: {
              accountNumber: '9999999999',
              accountType: '10'
            },
            amount: '100000',
            countryCode: 'NG',
            currencyCode: '566',
            entityCode: '011',
            paymentMethodCode: 'AC'
          },
          transferCode: '1456111111221'
        })
      .reply(200, {
        Customers:
        [{
          paymentCode: '10401',
          customerId: '0000000001',
          responseCode: '90000',
          fullName: 'Test Test'
        }]
      })

    it('Should perform Quickteller Funds Transfer', () => {
      const quickTellerSva = new QuickTellerSva(credentials)
      quickTellerSva
        .FundsResource
        .fundsTransfer({
          mac: '9f4e4f53c57be63e1f08d8f07a7bc1a9461e4a7d5304043daa1ef54bd727b6cde148f4fbfc5e2ad8c4a60f78dfa76304de671fbeb70657b1628f14b6b6baa5e1',
          beneficiary: {
            lastname: 'Anari',
            othernames: 'Sammy'
          },
          initiatingEntityCode: 'XXT',
          initiation: {
            amount: '100000',
            channel: '7',
            currencyCode: '566',
            paymentMethodCode: 'CA'
          },
          sender: {
            email: 'simon.mokhele@hellogroup.co.za',
            lastname: 'Testing',
            othernames: 'Test',
            phone: '0732246413'
          },
          termination: {
            accountReceivable: {
              accountNumber: '9999999999',
              accountType: '10'
            },
            amount: '100000',
            countryCode: 'NG',
            currencyCode: '566',
            entityCode: '011',
            paymentMethodCode: 'AC'
          },
          transferCode: '1456111111221'
        })
        .then((response) => {
          expect(response.data.Customers[0].paymentCode).to.equal('10401')
        })
    })
  })
})
