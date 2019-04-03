import dotenv from 'dotenv'
import QuickTellerSva from '../src/QuickTellerSva'

dotenv.config()

const quickTellerSva = new QuickTellerSva(
  {
    apiSecret: process.env.API_SECRET,
    clientId: process.env.CLIENT_ID,
    terminalId: process.env.TERMINAL_ID
  }
)

quickTellerSva
  .TransactionResource
  .queryTransaction(14561489752590)
  .then((response) => {
    console.log('response', response)
  })
  .catch((err) => {
    console.log('error', err)
  })
