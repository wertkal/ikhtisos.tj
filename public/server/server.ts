import express, { Request, Response, NextFunction } from "express";
import fs from "fs";
import cors from "cors";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import path from "path";

declare global {
  namespace Express {
    interface Request {
      user?: any; // Указываем тип данных для user
    }
  }
}

const app = express();
const DB_PATH = "./db.json";
const SECRET = "ikhtisos-secret";

app.use(cors());
app.use(bodyParser.json());

// Чтение и запись в базу данных
function readDB() {
  return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
}

function writeDB(data: any) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// МИДЛВЕРА для аутентификации
function authMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

  try {
    const token = authHeader.split(" ")[1];
    const user = jwt.verify(token, SECRET);
    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}

// Роуты аутентификации ---------------------------------
app.post("/api/register", async (req: Request, res: any) => {
  const { userName, userEmail, userPhone, password, confirmPassword } = req.body;
  const db = readDB();
  const userExists = db.users.find((u: any) => u.userEmail === userEmail);
  if (userExists) return res.status(400).json({ message: "User already exists" });

  if (password !== confirmPassword) return res.status(400).json({ message: "Passwords do not match" });

  const hashed = await bcrypt.hash(password, 10);
  const newUser = {
    userName,
    userEmail,
    userPhone,
    role: "client",
    password: hashed,
    notification: []
  };
  db.users.push(newUser);
  writeDB(db);
  res.json({ message: "Registered successfully" });
});

app.post("/api/login", async (req: Request, res: any) => {
  const { userEmail, password } = req.body;
  const db = readDB();
  const user = db.users.find((u: any) => u.userEmail === userEmail);
  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ userEmail: user.userEmail, role: user.role }, SECRET);
  res.json({ token });
});

// Получение переводов (русский, таджикский, английский)
app.get("/api/translations/:lang", (req: Request, res: Response) => {
  const { lang } = req.params;
  try {
    const translations = JSON.parse(fs.readFileSync(path.join("./locales", `${lang}.json`), "utf-8"));
    res.json(translations);
  } catch {
    res.status(404).json({ message: "Translation not found" });
  }
});

// Получение новостей
app.get("/api/news", (req: Request, res: Response) => {
  const news = JSON.parse(fs.readFileSync("./news.json", "utf-8"));
  const twoDaysAgo = Date.now() - 2 * 24 * 60 * 60 * 1000;
  const filtered = news.filter((n: any) => new Date(n.date).getTime() >= twoDaysAgo);
  res.json(filtered);
});

// Добавление профессии в избранное
app.post("/api/favorites", authMiddleware, (req: Request, res: Response) => {
  const { professionId } = req.body;
  const db = readDB();
  const user = db.users.find((u: any) => u.userEmail === req.user.userEmail);
  const allProfessions = db.data.flatMap((group: any) => group.profession);
  const prof = allProfessions.find((p: any) => p.professionId === professionId);
  if (!prof) return res.status(404).json({ message: "Profession not found" });

  if (!user.notification) user.notification = [];
  const alreadyAdded = user.notification.find((n: any) => n.professionId === professionId);
  if (alreadyAdded) return res.status(400).json({ message: "Already in favorites" });

  user.notification.push({
    professionId: prof.professionId,
    professionName: prof.professionName,
    createAt: new Date().toISOString(),
    notification: false
  });

  writeDB(db);
  res.json({ message: "Added to favorites" });
});

// Получение избранных профессий
app.get("/api/favorites", authMiddleware, (req: Request, res: Response) => {
  const db = readDB();
  const user = db.users.find((u: any) => u.userEmail === req.user.userEmail);
  res.json(user.notification || []);
});

// Админ роуты для профессий
app.post("/api/admin/profession", authMiddleware, (req: Request, res: Response) => {
  const { groupName, professionName } = req.body;
  const db = readDB();
  if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });

  const group = db.data.find((g: any) => g.groupName === groupName);
  if (!group) return res.status(404).json({ message: "Group not found" });

  const newProfession = {
    professionName,
    professionId: Math.random().toString(36).substr(2, 10),
    createAt: new Date().toISOString(),
    notification: false
  };

  group.profession.push(newProfession);
  writeDB(db);
  res.json({ message: "Profession added", profession: newProfession });
});

app.put("/api/admin/profession/:id", authMiddleware, (req: Request, res: Response) => {
  const { id } = req.params;
  const { newName } = req.body;
  const db = readDB();
  if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });

  const prof = db.data.flatMap((g: any) => g.profession).find((p: any) => p.professionId === id);
  if (!prof) return res.status(404).json({ message: "Profession not found" });

  prof.professionName = newName;
  writeDB(db);
  res.json({ message: "Profession updated", profession: prof });
});

app.delete("/api/admin/profession/:id", authMiddleware, (req: Request, res: Response) => {
  const { id } = req.params;
  const db = readDB();
  if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });

  let deleted = false;
  db.data.forEach((group: any) => {
    const before = group.profession.length;
    group.profession = group.profession.filter((p: any) => p.professionId !== id);
    if (group.profession.length < before) deleted = true;
  });

  if (!deleted) return res.status(404).json({ message: "Profession not found" });

  writeDB(db);
  res.json({ message: "Profession deleted" });
});

// Запуск сервера
app.listen(5000, () => console.log("Server running on http://localhost:5000"));
