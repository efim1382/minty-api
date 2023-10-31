import bcrypt from "bcrypt";
import { createUser, findUser } from "models/user";

export const register = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({ error: "Email and password are required" });
		}

		const existingUser = await findUser(email);

		if (existingUser) {
			return res.status(400).json({ error: "User already exists" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = await createUser(email, hashedPassword);
		res.status(201).json(newUser);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await findUser(email);

		if (!user) {
			return res.status(400).json({ error: "User not found" });
		}

		const match = await bcrypt.compare(password, user.password);

		if (!match) {
			return res.status(400).json({ error: "Invalid password" });
		}

		req.session.userId = user.id;

		const responseUser = {
			id: user.id,
			email: user.email,
		};

		res.json({
			user: responseUser,
			message: "Logged in successfully",
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};

export const logout = (req, res) => {
	req.session.destroy((error) => {
		if (error) {
			console.log(error);
		}

		res.clearCookie("connect.sid"); // ??
		res.json({});
	});
};
