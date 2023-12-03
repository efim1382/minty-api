import * as accountModel from "models/account";

export const getUserAccounts = async (req, res) => {
	const { userId } = req.session;

	try {
		const accounts = await accountModel.getUserAccounts(userId);
		res.json({ accounts });
	} catch (err) {
		console.error(err);
		res.status(500).send("Server error");
	}
};

export const createAccount = async (req, res) => {
	const { userId } = req.session;
	const { walletId, currencyCode, name, balance } = req.body;

	const data = {
		userId,
		walletId,
		accountTypeCode: "debit",
		currencyCode,
		name,
		balance,
	};

	try {
		await accountModel.createAccount(data);
		res.status(200).json({});
	} catch (err) {
		console.error(err);
		res.status(500).send("Server error");
	}
};