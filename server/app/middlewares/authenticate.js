
import { verifyAccessToken, decodeToken } from "../utils/jwt.js";

async function authenticate(req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        console.log(authorizationHeader, "-----Authorization Header----");
        
        const token = authorizationHeader?.split(" ")[1];

        const isTokenVerified = await verifyAccessToken(token)
        
        if(!isTokenVerified) {
            res.status(401).json({message: "Token invalid or expired"})
        }

        const decoded = await decodeToken(token);


        const user = {
            id: decoded.id,
            email: decoded.email
        }

        req.user = user;

        next();
    } catch (error) {
        console.error("[Authenticate Middleware] ", error.message)
    }
}

export default authenticate