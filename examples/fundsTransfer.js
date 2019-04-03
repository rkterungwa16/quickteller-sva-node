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
  .BillersResource
  .sendBillPaymentAdvice({
    mac: '9f4e4f53c57be63e1f08d8f07a7bc1a9461e4a7d5304043daa1ef54bd727b6cde148f4fbfc5e2ad8c4a60f78dfa76304de671fbeb70657b1628f14b6b6baa5e1',
    beneficiary: {
      lastname: 'Anari',
      othernames: 'Sammy'
    },
    initiatingEntityCode: 'XXT',
    initiation: {
      amount: '100000',
      channel: '7',
      currencyCode: '566',
      paymentMethodCode: 'CA'
    },
    sender: {
      email: 'simon.mokhele@hellogroup.co.za',
      lastname: 'Testing',
      othernames: 'Test',
      phone: '0732246413'
    },
    termination: {
      accountReceivable: {
        accountNumber: '9999999999',
        accountType: '10'
      },
      amount: '100000',
      countryCode: 'NG',
      currencyCode: '566',
      entityCode: '011',
      paymentMethodCode: 'AC'
    },
    transferCode: '1456{{Timestamp}}'
  })
  .then((response) => {
    console.log('response', response)
  })
  .catch((err) => {
    console.log('error', err)
  })
