import * as currencyModel from "models/currency";

export const getCurrencies = async (req, res) => {
	try {
		const currencies = await currencyModel.getCurrencies();
		res.json(currencies);
	} catch (err) {
		console.error(err);
		res.status(500).send("Server error");
	}
};
