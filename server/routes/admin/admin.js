import { Router } from "express";
const router = Router();
import multer from "multer";
import cloudinary from "../../config/cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { AuthMiddleware } from "../../middleware/AuthMiddlware.js";
import {
  driversAddHandler,
  fetchAllDriversHandler,
  fetchParticularDriverForEdit,
  handlerForPaidSalary,
  updateParticularDriverHandler,
  handlerForDeleteDrivers,
} from "../../controllers/admin/driver.logic.js";
import {
  getWeaklyAnalyticsOfBooking,
  gettingAllUserHandler,
} from "../../controllers/admin/admin.logic.js";
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    format: async (req, res) => "jpeg",
    public_id: async (req, file) =>
      `${Date.now()}-${file.originalname.split(".")[0]}`,
  },
});
const upload = multer({ storage: storage });
// drivers Routes
router.post(
  "/driver-add",
  AuthMiddleware,
  upload.single("image"),
  driversAddHandler
);
router.get("/all-driver", AuthMiddleware, fetchAllDriversHandler);
router.get("/driver/:id", AuthMiddleware, fetchParticularDriverForEdit);
router.delete("/delete-driver/:id", AuthMiddleware, handlerForDeleteDrivers);
router.post(
  "/driver-update/:id",
  AuthMiddleware,
  updateParticularDriverHandler
);
router.post("/paid-salary/:id", AuthMiddleware, handlerForPaidSalary);

// for specific Work
router.get("/analytics", AuthMiddleware, getWeaklyAnalyticsOfBooking);
router.get("/all-users", AuthMiddleware, gettingAllUserHandler);
export default router;
