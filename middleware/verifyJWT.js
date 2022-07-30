import jwt from "jsonwebtoken";

export const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(403) && console.log("No Auth Header");

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decodedUser) => {
    if (error) return res.sendStatus(403);
    req.username = decodedUser.username;
    next();
  });
};
