import dotenv from 'dotenv'
import QuickTellerSva from '../src'

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
  .paymentEnquiry({
    paymentCode: '04226901',
    customerId: '3394433',
    customerMobile: '08032269223',
    customerEmail: 'customer1@gmail.com',
    pageFlowValues: 'BankId:16|DestinationAccountNumber:0221149201|DestinationAccountType:10|Amount:60000|ReciepientName:GBOLAHAN MUSBAU SUBAIR',
    amount: '60000'
  })
  .then((response) => {
    console.log('response', response)
  })
  .catch((err) => {
    console.log('error', err)
  })
