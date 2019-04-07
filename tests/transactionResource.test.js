import chai from 'chai'
import nock from 'nock'

import QuickTellerSva from '../src'
import credentials from './credentialFixtures'

const { expect } = chai

describe('Transaction Resources', () => {
  describe('Send Payment Transaction', () => {
    nock('https://sandbox.interswitchng.com/api/v2', { allowUnmocked: true })
      .post('/quickteller/transactions',
        {
          amount: 250000,
          pinData: '123456785',
          secureData: '123455666',
          msisdn: 2348030014003,
          transactionRef: 'AQT|T|MOB|4AQT0001|KEDP|241016153410|00012392',
          cardBin: 53701002040
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

    it('Should perform Quickteller Payment Transaction', () => {
      const quickTellerSva = new QuickTellerSva(credentials)
      quickTellerSva
        .TransactionResource
        .sendPaymentTransaction({
          amount: 250000,
          pinData: '123456785',
          secureData: '123455666',
          msisdn: 2348030014003,
          transactionRef: 'AQT|T|MOB|4AQT0001|KEDP|241016153410|00012392',
          cardBin: 53701002040
        })
        .then((response) => {
          expect(response.Customers[0].paymentCode).to.equal('10401')
        })
    })
  })

  describe('Payment Inquiry', () => {
    nock('https://sandbox.interswitchng.com/api/v2', { allowUnmocked: true })
      .post('/quickteller/transactions/inquirys',
        {
          paymentCode: '04226901',
          customerId: '3394433',
          customerMobile: '08032269223',
          customerEmail: 'customer1@gmail.com',
          pageFlowValues: 'BankId:16|DestinationAccountNumber:0221149201|DestinationAccountType:10|Amount:60000|ReciepientName:GBOLAHAN MUSBAU SUBAIR',
          amount: '60000'
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

    it('Should perform Quickteller Payment Inquiry', () => {
      const quickTellerSva = new QuickTellerSva(credentials)
      quickTellerSva
        .TransactionResource
        .paymentEnquiry({
          paymentCode: '04226901',
          customerId: '3394433',
          customerMobile: '08032269223',
          customerEmail: 'customer1@gmail.com',
          pageFlowValues: 'BankId:16|DestinationAccountNumber:0221149201|DestinationAccountType:10|Amount:60000|ReciepientName:GBOLAHAN MUSBAU SUBAIR',
          amount: '60000'
        })
        .then((response) => {
          expect(response.Customers[0].paymentCode).to.equal('10401')
        })
    })
  })
})
