import * as walletModel from "models/wallet";

export const getWallets = async (req, res) => {
	try {
		const wallets = await walletModel.getWallets();
		res.json({ wallets });
	} catch (err) {
		console.error(err);
		res.status(500).send("Server error");
	}
};
