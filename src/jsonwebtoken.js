import jwt from 'jsonwebtoken'

const createJWT = (username, role, id) => {
  let payload = { username, role, id};
  let key = process.env.JWT_SECRET;
  let token = null;
  try {
    token = jwt.sign(payload, key);
  } catch (err) {}
  return token;
};

const verifyToken = (token) => {
  let key = process.env.JWT_SECRET;
  let decoded = null;
  try {
    decoded = jwt.verify(token, key);
  } catch (err) {
    console.log(err);
  }
  return decoded;
};

export default { createJWT, verifyToken };