import QuickTellerSva from '../src/QuickTellerSva'

const quickTellerSva = new QuickTellerSva(
  {
    apiSecret: 'NM5KgYhD5HU4gaZ06QVgOHT5PzwC1WtSqlsTz4Rye28=',
    clientId: 'IKIA102249A8D9725133C68C74B11DE859C920F5C2CF',
    terminalId: '3ERT0001'
  }
)

quickTellerSva
  .BillersResource
  .getBillerPaymentItems(303)
  .then((response) => {
    console.log('response', response)
  })
  .catch((err) => {
    console.log('error', err)
  })
