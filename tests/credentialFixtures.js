import dotenv from 'dotenv'

dotenv.config()

const credentials = {
  apiSecret: process.env.API_SECRET,
  clientId: process.env.CLIENT_ID,
  terminalId: process.env.TERMINAL_ID,
  environment: 'development'
}

export default credentials
