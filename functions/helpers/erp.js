import 'dotenv/config'

const credentials = `${process.env.ERP_KEY}:${process.env.ERP_SECRET}`
const encodedCredentials = Buffer.from(credentials).toString("base64")

const baseUrl = process.env.ERP_URL

const headers = {
    "Content-Type": "application/json",
    // Authorization: `Basic ${encodedCredentials}`,
    Authorization: `token ${process.env.ERP_KEY}:${process.env.ERP_SECRET}`,
}

export default headers