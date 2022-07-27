import User from "../models/user.js";

export const handleLogout = async (req, res) => {

  const cookies = req.cookies;
  if (!cookies?.jwt ) return res.sendStatus(204);
  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({ refreshToken: refreshToken });
  if (!foundUser) {
    res.clearCookie('jwt', {httpOnly: true}) //add flag {secure: true} -- only serves on https
    return res.sendStatus(204)
  }
  foundUser.refreshToken = ""
  await foundUser.save()
  res.clearCookie('jwt', {httpOnly: true}) // add flag {secure: true} -- only serves on https
  return res.sendStatus(204)
};
