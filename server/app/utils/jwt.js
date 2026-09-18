import jwt from "jsonwebtoken"
import { configDotenv } from "dotenv"
configDotenv()

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRY = process.env.JWT_EXPIRY

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET
const JWT_RERESH_EXPIRY = process.env.JWT_REFRESH_EXPIRY

async function generateAccessToken(payload) {
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY} )
    return token
}

async function generateRefreshToken(payload) {
    const token = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: JWT_RERESH_EXPIRY})
    return token
}

async function verifyAccessToken(token) {
    const decoded = jwt.verify(token, JWT_SECRET, { complete: true })
    return decoded
}

async function verifyRefreshToken(token) {
    const decoded = jwt.verify(token, JWT_SECRET, { complete: true })
    return decoded
}

async function decodeToken(token) {
    const decoded = jwt.decode(token);
    return decoded;
}

export {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
    decodeToken
}