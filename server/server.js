import "dotenv/config";
import express from "express";
import BookingRoute from "./routes/Booking.js";
import UserRoutes from "./routes/user.js";
import adminRoute from "./routes/admin/admin.js";
import cors from "cors";
import { MongoDbConnections } from "./config/mongoDb.js";
import cookieParser from "cookie-parser";
const app = express();

const PORT = process.env.PORT;
const mongoUri = process.env.MONGO_URI;

MongoDbConnections(mongoUri)
  .then(() => console.log("mongoDb Connected Successfully"))
  .catch((e) => console.log(e));

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/booking", BookingRoute);
app.use("/user", UserRoutes);
app.use("/admin", adminRoute);

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
