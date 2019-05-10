import dotenv from 'dotenv'
import QuickTellerSva from '../src'

dotenv.config()

const quickTellerSva = new QuickTellerSva(
  {
    apiSecret: process.env.API_SECRET,
    clientId: process.env.CLIENT_ID,
    terminalId: process.env.TERMINAL_ID,
    environment: 'development'
  }
)

quickTellerSva
  .BillersResource
  .getBillers()
  .then((response) => {
    console.log('response', response.data.billers)
  })
  .catch((err) => {
    console.log('error', err)
  })
