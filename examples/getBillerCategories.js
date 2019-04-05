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
  .BillerCategoriesResource
  .getBillerCategories()
  .then((response) => {
    console.log('response', response)
  })
  .catch((err) => {
    console.log('error', err)
  })
