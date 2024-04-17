import "dotenv/config"
import axios from "axios"
import headers from "./erp.js"
import { DateTime } from "luxon"

const getResource = async ({ resource, id }) => {
	const url = `${process.env.ERP_URL}resource/${resource}/${id}`

	const data = await axios({
		method: "GET",
		headers,
		url,
	})
		.then(res => res.data.data)
		.catch(err => {
			console.log(err)
		})

	return data
}

const createError = async error => {
	const data = await axios({
		method: "POST",
		headers,
		url: `${process.env.ERP_URL}resource/PointzError`,
		data: { error },
	})
		.then(res => res.data.data)
		.catch(err => {
			// console.log(err)
			return {}
		})

	return data
}

const savePoints = async ({ id, details, points, existing, currentTotal }) => {
	const res = await axios({
		method: 'PUT',
		headers,
		url: `${process.env.ERP_URL}resource/Customer/${id}`,
		data: {
			custom_pointz_transactions: [...existing, {
				details,
				points,
				date: DateTime.local().toFormat("yyyy-MM-dd"),
			}],
			custom_points_total: currentTotal ? currentTotal + points : points
		}
	}).then(res => res.data.data)
		.catch(err => {
			console.log(err)
		})

	return res
}

export { getResource, createError, savePoints }
