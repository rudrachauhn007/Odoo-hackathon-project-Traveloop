import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import tripRoutes from "./routes/tripRoutes.js";
import stopRoutes from "./routes/stopRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import checklistRoutes from "./routes/checklistRoutes.js";
import communityRoutes from "./routes/communityRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev"));

app.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "Traveloop API Running",
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/stops", stopRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/checklist", checklistRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/notifications", notificationRoutes);

export default app;
