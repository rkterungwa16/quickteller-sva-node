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
    console.log('response', response)
  })
  .catch((err) => {
    console.log('error', err)
  })
