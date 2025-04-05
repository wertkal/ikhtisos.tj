import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Твой секретный ключ для JWT
const SECRET = "ikhtisos-secret";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    // Берем токен из заголовка
    const token = authHeader.split(" ")[1];
    const user = jwt.verify(token, SECRET);
    req.user = user; // Добавляем пользователя в запрос
    next(); // Переходим к следующему обработчику
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
}
