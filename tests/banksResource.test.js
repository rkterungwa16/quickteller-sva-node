import chai from 'chai'
import nock from 'nock'

import QuickTellerSva from '../src'
import credentials from './credentialFixtures'

const { expect } = chai

describe('Bank Resources', () => {
  describe('Get Banks', () => {
    nock('https://sandbox.interswitchng.com/api/v2')
      .get('/quickteller/configuration/fundstransferbanks')
      .reply(200, [{
        banks: {
          id: '31',
          cbnCode: '044',
          bankName: 'Access Bank Nigeria Plc',
          bankCode: 'ABP'
        }
      }])

    it('Should return the correct banks information', () => {
      const quickTellerSva = new QuickTellerSva(credentials)
      quickTellerSva
        .BanksResource
        .getBanks()
        .then((response) => {
          expect(response[0].banks.id).to.equal('31')
        })
    })
  })

  describe('Name Enquiry', () => {
    nock('https://sandbox.interswitchng.com/api/v2', { allowUnmocked: true })
      .get('/nameenquiry/banks/accounts/names')
      .reply(200, {
        accountName: 'EVANS  ERHOBAGA-AGOFURE'
      })

    it('Should validate account number', () => {
      const quickTellerSva = new QuickTellerSva(credentials)
      quickTellerSva
        .BanksResource
        .nameEnquiry({
          bankCode: '058',
          accountId: '0014261063'
        })
        .then((response) => {
          expect(response.accountName).to.equal('EVANS  ERHOBAGA-AGOFURE')
        })
    })
  })
})
