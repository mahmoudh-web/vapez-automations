import express from "express"
import "dotenv/config"
import { createError } from "./functions/helpers/index.js"
import { addPoints, redeemPoints } from "./addPoints/index.js"

const app = express()
const port = 9000

app.use(function (req, res, next) {
	const allowed = process.env.ALLOWED_KEY.split(",")
	const apiKey = req.headers["apikey"]

	if (allowed.includes(apiKey)) {
		next()
	} else {
		res.status(401).json({ error: "Unauthorized" })
	}
})

app.use(express.json())

// routes

// update points
app.post("/add-points", async (req, res) => {
	const { id, details } = req.body

	// if data missing, create error
	if (!id || !details) {
		console.log("missing data")
		const saveError = await createError(req.body)
		return res.status(200).json({ data: "Missing data" })
	}
	// if data is valid, update points

	const newPoints = await addPoints(id, details)
	res.status(200).send({ data: newPoints })
})

// redeem points
app.post("/redeem-points", async (req, res) => {
	const { id, details, points } = req.body

	// if data missing, create error
	if (!id || !details || !points) {
		console.log("missing data")
		const saveError = await createError(req.body)
		return res.status(200).json({ data: "Missing data" })
	}
	// if data is valid, update points

	const redeem = await redeemPoints(id, details, 0 - points)
	res.status(200).send({ data: redeem })
})

app.use(function (req, res, next) {
	res.status(400).json({ error: "Bad Request" })
})

app.listen(port, () => {
	console.log(`App listening on port ${port}`)
})
