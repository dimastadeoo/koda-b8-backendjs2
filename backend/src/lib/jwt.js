import jwt from "jsonwebtoken";

// eslint-disable-next-line no-undef
const SECRET = process.env.JWT_KEY;

function sign(payload){
  return jwt.sign(payload, SECRET);
}

function verify(token){
  return jwt.verify(token, SECRET);
}

const libJwt = {sign, verify};

export default libJwt;