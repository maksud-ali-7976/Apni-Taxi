import { User } from "../../model/user.model.js";
import { Booking } from "../../model/booking.model.js";

export async function gettingAllUserHandler(req, res) {
  try {
    const allUsers = await User.find({role:{$ne:"admin"}});

    if (!allUsers) {
      return res
        .status(401)
        .json({ success: false, message: "Some Error Accured" });
    }
    return res.status(200).json({ success: true, result: allUsers });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Interval Server ErrorF" });
  }
}

export async function getWeaklyAnalyticsOfBooking(req, res) {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const analytics = await Booking.aggregate([
      {
        $match: {
          bookingTime: { $gte: oneWeekAgo },
        },
      },
      {
        $group: {
          _id: { day: { $dayOfWeek: "$bookingTime" } },
          totalBooking: { $sum: 1 },
        },
      },
      { $sort: { "_id.day": 1 } },
    ]);

    return res.status(200).json({ success: true, data: analytics });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Interval Server Error" });
  }
}
