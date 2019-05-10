import chai from 'chai'
import nock from 'nock'

import QuickTellerSva from '../src'
import credentials from './credentialFixtures'

const { expect } = chai

describe('Billers Resources', () => {
  describe('Get Billers', () => {
    nock('https://sandbox.interswitchng.com/api/v2', { allowUnmocked: true })
      .get('/quickteller/billers')
      .reply(200, {
        categoryname: 'Insurance',
        categorydescription: 'Insurance Payments',
        billerid: '900',
        billername: 'Gurantee Trust Assurance',
      })

    it('Should return the correct biller information', () => {
      const quickTellerSva = new QuickTellerSva(credentials)
      quickTellerSva
        .BillersResource
        .getBillers()
        .then((response) => {
          expect(response.data.categoryname).to.equal('Insurance')
        })
    })
  })

  describe('Billers by category', () => {
    nock('https://sandbox.interswitchng.com/api/v2', { allowUnmocked: true })
      .get('/quickteller/categorys/900/billers')
      .reply(200, {
        categoryname: 'Insurance',
        categorydescription: 'Insurance Payments',
        billerid: '900',
        billername: 'Gurantee Trust Assurance',
      })

    it('Should return correct biller with specified category', () => {
      const quickTellerSva = new QuickTellerSva(credentials)
      quickTellerSva
        .BillersResource
        .getBillersByCategory(900)
        .then((response) => {
          expect(response.data.billername).to.equal('Gurantee Trust Assurance')
        })
    })
  })

  describe('Biller Payment Items', () => {
    nock('https://sandbox.interswitchng.com/api/v2', { allowUnmocked: true })
      .get('/quickteller/billers/104/paymentitems')
      .reply(200, {
        paymentitems: [{
          categoryid: '2',
          billerid: '104',
          isAmountFixed: false,
          paymentitemid: 14,
          paymentitemname: 'PREMIUM + FRENCH',
          amount: '1968000',
          code: '14',
          currencyCode: '566',
          currencySymbol: 'NGN',
          itemCurrencySymbol: '',
          sortOrder: '0',
          pictureId: '0',
          paymentCode: '10414'
        }
        ]
      })

    it('Should retrieve billers based on the supplied search criteria', () => {
      const quickTellerSva = new QuickTellerSva(credentials)
      quickTellerSva
        .BillersResource
        .getBillerPaymentItems(104)
        .then((response) => {
          expect(response.data.paymentitems[0].billerid).to.equal('104')
        })
    })
  })

  describe('Send Payment Bill Advice', () => {
    nock('https://sandbox.interswitchng.com/api/v2', { allowUnmocked: true })
      .post('/quickteller/payments/advices',
        {
          TerminalId: process.env.TERMINAL_ID,
          paymentCode: '10403',
          customerId: '0000000001',
          customerMobile: '2348056731576',
          customerEmail: 'iswtester2@yahoo.com',
          amount: '360000',
          requestReference: '14131194000023'
        })
      .reply(200, {
        transactionReference: '14131194000023'
      })

    it('Should notify the biller of the payment', () => {
      const quickTellerSva = new QuickTellerSva(credentials)
      quickTellerSva
        .BillersResource
        .sendBillPaymentAdvice({
          TerminalId: process.env.TERMINAL_ID,
          paymentCode: '10403',
          customerId: '0000000001',
          customerMobile: '2348056731576',
          customerEmail: 'iswtester2@yahoo.com',
          amount: '360000',
          requestReference: '14131194000023'
        })
        .catch((err) => {
          expect(typeof err).to.equal('object')
        })
    })
  })
})
