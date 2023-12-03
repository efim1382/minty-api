import { query } from "database";

export const getCurrencies = async () => {
	const result = await query(`
		SELECT * FROM currency
	`);

	return result.rows;
};
