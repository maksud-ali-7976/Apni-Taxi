import jwt from "jsonwebtoken";

export async function AuthMiddleware(req, res, next) {
  const token = req.cookies?.token;
  try {
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "UnAuthorized User" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
   
    return res.status(500).json({ success: false, message: "Server Error" });
  }
}
