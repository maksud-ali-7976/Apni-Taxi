import { Router } from "express";
const router = Router();
const baseUrl = process.env.BASE_URL_SEARCH_BOX;
const access_token = process.env.PUBLIC_MAP_BOX_ACCESS_TOKEN;
const sessionId = process.env.SESSION_TOKEN;
import { AuthMiddleware } from "../middleware/AuthMiddlware.js";
import {
  BookingHandler,
  GettingAllBookedRide,
  gettingRejectedRide,
  gettingCompletedRide,
} from "../controllers/booking.js";
router.get("/auto-completeAdd", async (req, res) => {
  const { q } = req.query;
  const response = await fetch(
    `${baseUrl}?q=${q}&language=en&limit=4&session_token=${sessionId}&country=IN&access_token=${access_token}`
  );
  const result = await response.json();
  return res.status(200).json({ success: true, data: result });
});
router.post("/taxi-booking", AuthMiddleware, BookingHandler);
router.get("/all-booked", AuthMiddleware, GettingAllBookedRide);
router.get("/rejected-booking", AuthMiddleware, gettingRejectedRide);
router.get("/completed-booking", AuthMiddleware, gettingCompletedRide);
export default router;
