import { query } from "database";

export const createUser = async (email, password) => {
	const result = await query(
		"INSERT INTO \"user\" (email, password) VALUES ($1, $2) RETURNING *",
		[email, password],
	);

	return result.rows[0];
};

export const findUser = async (email) => {
	const result = await query(
		"SELECT * FROM \"user\" WHERE email = $1",
		[email],
	);

	return result.rows[0];
};
