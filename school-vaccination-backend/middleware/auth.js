module.exports = (req, res, next) => {
  // For simulation, accept any token or check a hardcoded one
  const token = req.headers["authorization"];
  if (token === "fake-token") {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
