import jwt, { JwtPayload } from "jsonwebtoken";
import { Response, Request } from "express";

interface CustomRequest extends Request {
    userId?: string; // Assuming userId is a string
}

interface CustomJwtPayload extends JwtPayload {
    userId: string;
}

function verifyToken(req: Request, res: Response, next: () => void) {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
        return res.status(401).json({ error: "Access denied, token missing!" });
    }

    const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"
    if (!token) {
        return res.status(401).json({ error: "Access denied" });
    }
    try {
        const decoded = jwt.verify(
            token,
            "your-secret-key"
        ) as CustomJwtPayload;
        (req as CustomRequest).userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
}

export default verifyToken;
