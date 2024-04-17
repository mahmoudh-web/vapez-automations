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

export { getResource, createError }
