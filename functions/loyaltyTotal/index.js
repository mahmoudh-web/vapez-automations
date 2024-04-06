import { getCustomers } from "../../utils/erp.js"

const calculatePoints = async () => {
    const customers = await getCustomers()
    console.log(customers)
}

export { calculatePoints }