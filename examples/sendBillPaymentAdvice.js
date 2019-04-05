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
  .sendBillPaymentAdvice({
    TerminalId: process.env.TERMINAL_ID,
    paymentCode: '10403',
    customerId: '0000000001',
    customerMobile: '2348056731576',
    customerEmail: 'iswtester2@yahoo.com',
    amount: '360000',
    requestReference: '14131194000023'
  })
  .then((response) => {
    console.log('response', response)
  })
  .catch((err) => {
    console.log('error', err)
  })
