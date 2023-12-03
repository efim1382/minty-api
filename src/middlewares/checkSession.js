export default (req, res, next) => {
	if (!req.session.userId) {
		return res.status(401).json({ message: "Session expired" });
	}

	req.session._garbage = Date();
	req.session.touch();
	next();
};
