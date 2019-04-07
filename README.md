# quickteller-sva-node
Node.js library for the Quickteller SVA API.

[![Build Status](https://travis-ci.org/rkterungwa16/quickteller-sva-node.svg?branch=master)](https://travis-ci.org/rkterungwa16/quickteller-sva-node) [![Coverage Status](https://coveralls.io/repos/github/rkterungwa16/quickteller-sva-node/badge.svg?branch=master)](https://coveralls.io/github/rkterungwa16/quickteller-sva-node?branch=master)

[![NPM](https://nodei.co/npm/quickteller-sva-node.png)](https://nodei.co/npm/quickteller-sva-node/)

[Installation](#installation) | [Constructor](#constructor) | [Billers](#billers) | [Banks](#banks) | [BillerCategories](#biller-categories) | [Customer](#customer) | [Funds](#funds) | [Transaction](#transaction)

## Installation

```bash
npm install quickteller-sva-node
```

## Constructor

```js
import QuickTellerSva from 'quickteller-sva-node'

const quickTellerSva = new QuickTellerSva(
  {
    apiSecret: API_SECRET,
    clientId: CLIENT_ID,
    terminalId: TERMINAL_ID,
    environment: 'development'
  }
)
```

* `apiSecret` - API secret from interswitch .
* `clientId` - Client id from interswitch.
* `terminalId` - Application terminal id from interswitch
* `environment` - Environment (production or development)

## Billers

### Get billers

```js
quickTellerSva
  .BillersResource
  .getBillers()
  .then((response) => {
    console.log('response', response)
  })
  .catch((err) => {
    console.log('error', err)
  })
```

### Get billers by category

```js
quickTellerSva
  .BillersResource
  .getBillersByCategory(25)
  .then((response) => {
    console.log('response', response)
  })
  .catch((err) => {
    console.log('error', err)
  })
```
