import QuickTellerSva from '../src/QuickTellerSva'

const quickTellerSva = new QuickTellerSva(
  {
    apiSecret: 'NM5KgYhD5HU4gaZ06QVgOHT5PzwC1WtSqlsTz4Rye28=',
    clientId: 'IKIA102249A8D9725133C68C74B11DE859C920F5C2CF',
    terminalId: '3ERT0001'
  }
)

quickTellerSva
  .BillersResoure
  .sendBillPaymentAdvice({
    TerminalId: '3ERT0001',
    paymentCode: '10403',
    customerId: '0000000001',
    customerMobile: '2348056731576',
    customerEmail: 'iswtester2@yahoo.com',
    amount: '360000',
    requestReference: '1194000023'
  })
  .then((response) => {
    console.log('response', response)
  })
  .catch((err) => {
    console.log('error', err)
  })
