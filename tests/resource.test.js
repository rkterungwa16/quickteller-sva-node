import chai from 'chai'

import Resource from '../src/Resource'
import credentials from './credentialFixtures'

const { expect } = chai

describe('Quickteller SVA Resource configuration', () => {
  it('It should return the correct api credentials', () => {
    const modifiedCredentials = Object.assign(credentials, {
      hostname: 'sandbox.interswitchng.com'
    })
    const resource = new Resource(modifiedCredentials)
    expect(resource.apiSecret).to.equal(modifiedCredentials.apiSecret)
    expect(resource.clientId).to.equal(modifiedCredentials.clientId)
    expect(resource.terminalId).to.equal(modifiedCredentials.terminalId)
    expect(resource.hostname).to.equal(modifiedCredentials.hostname)
  })
})
