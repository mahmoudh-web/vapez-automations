import 'dotenv/config'
import axios from 'axios'
import headers from './erp.js'

const getCustomer = async ({ id }) => {
    const url = `${process.env.ERP_URL}resource/Customer/${id}`

    const customer = await axios({
        method: 'GET',
        headers,
        url
    }).then(res => res.data.data)

    console.log(customer)

    return customer
}

export { getCustomer }