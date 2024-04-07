"use server"

import axios from "axios"
import { findIndex, sortBy } from "lodash-es"

const credentials = `${process.env.ERP_KEY}:${process.env.ERP_SECRET}`
const encodedCredentials = Buffer.from(credentials).toString("base64")

const baseUrl = process.env.ERP_URL

const headers = {
    // "Content-Type": "application/json",
    Authorization: `Basic ${encodedCredentials}`,
}


const getCustomers = async () => {
    const pageLength = 500
    const customers = []

    const data = await axios({
        method: "GET",
        url: `${baseUrl}resource/Customer?fields=["*"]&limit_page_length=${pageLength}&limit_start=${offset}`,
        headers,
    })
        .then(res => res.data.data)
        .catch(err => [])

    return data
}

const getPoints = async (id) => {
    const pointsTransactions = []


}

export { getCustomers }