declare module 'quickteller-sva-node' {

  export interface AirtimeInfo {
    billerName: string;
    customerPhoneNumber: string;
    amount: number;
  }
  export default class QuickTellerSva {
    BillersResource: BillersResource;
    BillerCategoriesResource: BillerCategoriesResource;
    BanksResource: BanksResource;
    FundsResource: FundsResource;
    TransactionResource: TransactionResource;
    CustomerResource: CustomerResource;
    constructor (apiCredentials: ApiCredentials)
    buyAirtime(airtimeInfo: AirtimeInfo)
  }

  export class Resource {
    apiSecrecet: string;
    clientId: string;
    terminalId: string;
    hostname: string;
    protocol: string;
    constructor (apiCredentials: ApiCredentials)
  }

  export interface BillerResourcePaymentAdviceRequestPayload {
    TerminalId: string;
    paymentCode: string;
    customerId: string;
    customerMobile?: string;
    customerEmail?: string;
    amount: number;
    requestReference: string;
  }

  export class BillersResource extends Resource {
    getBillers(): Promise<{}>
    getBillersByCategory(categoryId: number): Promise<{}>
    getBillerPaymentItems(billerId: number): Promise<{}>
    sendBillPaymentAdvice(requestPayload: BillerResourcePaymentAdviceRequestPayload): Promise<{}>
  }

  export interface BankCustomerNameEnquiryRequestPayload {
    bankCode: string;
    accountId: string;
  }

  export interface BanksResource extends Resource {
    getBanks(): Promise<{}>
    nameEnquiry(bankDetails: BankCustomerNameEnquiryRequestPayload): Promise<{}>
  }

  export class BillerCategoriesResource extends Resource {
    getBillerCategories(): Promise<{}>
  }

  export interface CustomerResourceValidationRequestPayload {
    customers: [{paymentCode: String; customerId: String}]
  }

  export class CustomerResource extends Resource {
    customerValidation(requestPayload: CustomerResourceValidationRequestPayload): Promise<{}>
  }

  export interface FundsResourceTransferRequestPayload {
    mac: string;
    beneficiary: {
      lastname: string;
      othernames: string;
      email: string;
      phone: number;
    };
    initiatingEntityCode: string;
    initiation: {
      amount: number;
      channel: number;
      currencyCode: string;
      paymentMethodCode: string;
    };
    sender: {
      lastname: string;
      othernames: string;
      phone: string;
      email?: string;
    };
    transferCode: string;
    termination: {
      accountRecievable: {
        accountNumber: string;
        accountType: string;
      };
      amount: number;
      countryCode: string;
      currencyCode: string;
      entityCode: string;
      paymentMethodCode: string;
      entityLocationCode?: string;
      stateCode?: string;
    };
    cashRecievable?: {
      typeCode: string;
      identification: string;
    }
  }

  export class FundsResource extends Resource {
    fundsTransfer(requestPayload: FundsResourceTransferRequestPayload): Promise<{}>
  }

  export interface TransactionResourcePaymentEnquiryRequestPayload {
    paymentCode: string;
    customerId: string;
    customerModile?: string;
    customerEmail?: string;
    amount?: number;
    pageFlowValues: string;
  }

  export interface TransactionResourceSendPaymentRequestPayload {
    pinData: string;
    secureData: string;
    msisdn?: string;
    transactionRef: string;
    amount: number;
    cardBin: string;
  }

  export class TransactionResource extends Resource {
    queryTransaction(requestReferencevalue: string): Promise<{}>
    paymentEnquiry(requestPayload: TransactionResourcePaymentEnquiryRequestPayload): Promise<{}>
    sendPaymentTransaction(requestPayload: TransactionResourceSendPaymentRequestPayload): Promise<{}>
  }

  export interface ApiCredentials {
    apiSecret: string;
    clientId: string;
    terminalId: string;
    environment?: string;
    hostname?: string;
  }

  export interface HttpConfigOptions {
    hostname: string;
    path: string;
    method: string;
    requestPayload?: object;
    headers?: object;
    https?: any;
    protocol: string;
  }

  export interface RequestConfigOptions {
    hostname: string;
    path: string;
    method: string;
    headers: object;
    protocol: string;
  }

  export interface GeneratedHeaderInterface {
    Signature: string;
    Authorization: string;
    Nonce: number;
    Timestamp: number;
    SignatureMethod: string;
    terminalID: string;
    headers: object;
  }

  export class HttpClient {
    apiCredentials: ApiCredentials;
    options: HttpConfigOptions;
    https: any;
    headers: object;

    constructor (apiCredentials: ApiCredentials, options: HttpConfigOptions)

    sendRequest(): Promise<Response>
    generateRequestHeaders(): GeneratedHeaderInterface
  }
}




