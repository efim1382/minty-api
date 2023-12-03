import { query } from "database";

export const getUserAccounts = async (userId) => {
	const result = await query(`
		SELECT
			a.id,
			a.name,
			a.account_type_code as "type",
			to_jsonb(a.balance) AS "balance",

			jsonb_build_object(
				'code', c.code,
				'symbol', c.symbol
			) AS currency,
			
			jsonb_build_object(
				'id', w.id,
				'name', w.name,
				'type', w.type
			) AS wallet
		FROM 
			account a
		JOIN 
			wallet w ON a.wallet_id = w.id
		JOIN
			currency c ON a.currency_code = c.code
		WHERE 
			a.user_id = $1
	`,

	[userId],
	);

	return result.rows;
};

export const createAccount = async (data) => {
	const {
		userId,
		walletId,
		accountTypeCode,
		currencyCode,
		name,
		balance,
	} = data;

	const result = await query(`
		INSERT INTO account (user_id, wallet_id, account_type_code, currency_code, name, balance)
		VALUES ($1, $2, $3, $4, $5, $6)
		RETURNING id;
	`,
	[userId, walletId, accountTypeCode, currencyCode, name, balance],
	);

	return result.rows[0].id;
};
