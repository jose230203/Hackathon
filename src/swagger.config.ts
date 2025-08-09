import { config } from 'dotenv'

config()

const swaggerConfig = {
   env:  process.env.NODE_ENV ?? 'development',
   port: process.env.PORT     ?? 5000
}

export default swaggerConfig