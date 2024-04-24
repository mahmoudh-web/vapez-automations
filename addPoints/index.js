import "dotenv/config"
import { getResource, savePoints } from "../functions/helpers/index.js"

/****
 *  get invoice
 *  get customer
 *  calculate points using tier
 *  add points to customer
 *  calculate points total
 *  update relevant fields
 *
 */

/* 
	points transactions are in customer => custom_pointz_transactions
	points total is stored in customer => custom_points_total
	points tier is stored in customer => custom_points_tier

	tiers:
		bronze: lifetime purchases < £500, 10 points / £1
		silver: lifetime purchases >= £500, 11 points / £1
		gold: lifetime purchases >= £1000, 12 points / £1
		platinum: lifetime purchases >= £2000, 15 points / £1


	process:
		add new transaction balance to existing balance. Positive for accumulated points, negative for spent points

*/

const pointTiers = {
	Bronze: 10,
	Silver: 11,
	Gold: 12,
	Platinum: 15,
}

const addPoints = async (id, details) => {
	// get invoice
	const invoice = await getResource({ resource: "Sales Invoice", id })
	console.log(invoice)
	const { net_total, grand_total, customer, name: invoiceId } = invoice

	// get customer
	const customerDetails = await getResource({
		resource: "Customer",
		id: customer,
	})
	const {
		custom_pointz_transactions,
		custom_points_tier,
		custom_points_total,
		name: customerId,
	} = customerDetails

	// calculate points using tier
	const tierPoints = pointTiers[custom_points_tier]
	const transactionPoints = Math.round(grand_total * tierPoints)

	if (transactionPoints === 0) return {}

	// // add points to customer
	const add = await savePoints({
		id: customerId,
		details,
		points: transactionPoints,
		existing: custom_pointz_transactions,
		currentTotal: custom_points_total,
	})

	return add
}

const redeemPoints = async (id, details, points) => {
	// get invoice
	const customerDetails = await getResource({ resource: "Customer", id })
	const {
		custom_pointz_transactions,
		custom_points_total,
		name: customerId,
	} = customerDetails

	const redeem = await savePoints({
		id: customerId,
		details,
		points,
		existing: custom_pointz_transactions,
		currentTotal: custom_points_total,
	})

	return redeem
}

export { addPoints, redeemPoints }
