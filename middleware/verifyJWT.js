import jwt from "jsonwebtoken";

export const verifyJWT = (req, res, next) => {
  console.log("Ussed JWTTTT")
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(403) && console.log("No Auth Header");

  console.log("AuthHeader Here: ",authHeader);
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decodedUser) => {
    if (error) return res.sendStatus(403);
    req.username = decodedUser.username;
    next();
  });
};
