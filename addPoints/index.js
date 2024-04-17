import "dotenv/config"
import { getResource } from "../functions/helpers/index.js"

/****
 *  get invoice
 *  get customer
 *  calculate points using tier
 *  add points to customer
 *  calculate points total
 *  update relevant fields
 *
 */

const addPoints = async id => {
	const invoice = await getResource({ resource: "Sales Invoice", id })
	const { net_total, customer } = invoice
	return invoice
}

export { addPoints }
