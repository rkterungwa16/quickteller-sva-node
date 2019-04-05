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
    console.log('response', response)
  })
  .catch((err) => {
    console.log('error', err)
  })
