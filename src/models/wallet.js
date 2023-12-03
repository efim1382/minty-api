import { query } from "database";

export const getWallets = async () => {
	const result = await query(`
		SELECT * FROM wallet
	`);

	return result.rows;
};
