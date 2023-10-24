export const register = (req, res) => {
	const { email, password } = req.body;
	console.log(email, password);
	res.status(201).json({ user: { email } });
};

export const login = (req, res) => {
	const { email, password } = req.body;
	console.log(email, password);
	res.json({ message: "Logged in successfully" });
};

// import { createUser, findUser } from "models/user";
//
// export const register = async (req, res) => {
// 	try {
// 		const { username, password } = req.body;
// 		const newUser = await createUser(username, password);
// 		res.status(201).json(newUser);
// 	} catch (error) {
// 		res.status(500).json({ error: error.message });
// 	}
// };
//
// export const login = async (req, res) => {
// 	try {
// 		const { username, password } = req.body;
// 		const user = await findUser(username);
//
// 		if (!user) {
// 			return res.status(400).json({ error: "User not found" });
// 		}
//
// 		res.json({
// 			message: "Logged in successfully",
// 		});
// 	} catch (error) {
// 		res.status(500).json({ error: error.message });
// 	}
// };
