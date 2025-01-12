import { Booking } from "../model/booking.model.js";
import { History } from "../model/history.model.js";
export async function BookingHandler(req, res) {
  const { pickUpAdd, dropAdd, amount, pickUp, drop } = req.body.bookingInfo;
  try {
    const booking = new Booking({
      pickUpAdd,
      dropAdd,
      amount,
      pickUp,
      drop,
      bookedBy: req.userId,
    });
    booking.bookingTime = new Date();
    await booking.save();
    await History.create({
      pickupLocation: pickUpAdd,
      dropLocation: dropAdd,
      bookingRent: amount,
      bookedBy: req.userId,
      bookingTime: booking.bookingTime,
    });
    return res
      .status(200)
      .json({ success: true, message: "Taxi Booked SuccessFully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function GettingAllBookedRide(req, res) {
  const { page = 1, limit = 10 } = req.query;
  try {
    const bookedRides = await Booking.find()
      .skip((page - 1) * limit)
      .limit(limit);
    if (!bookedRides) {
      return res
        .status(401)
        .json({ success: false, message: "Some error Accured" });
    }
    const totalRecords = await Booking.countDocuments();
    return res
      .status(200)
      .json({
        success: true,
        bookings: bookedRides,
        total: totalRecords,
        totalPage: Math.ceil(totalRecords / limit),
      });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Interval Server Error" });
  }
}

export async function gettingRejectedRide(req, res) {
  const userId = req.userId;
  try {
    const rejectedRide = await Booking.find({
      bookedBy: userId,
      rejectedRide: true,
    });
    if (!rejectedRide) {
      return res
        .status(401)
        .json({ success: false, message: "Some Error Accured" });
    }

    return res.status(200).json({ success: true, rejectedRide: rejectedRide });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Interval Server " });
  }
}

export async function gettingCompletedRide(req, res) {
  const userId = req.userId;

  try {
    const completedRide = await Booking.find({
      bookedBy: userId,
      completedRide: true,
    });
    if (!completedRide) {
      return res
        .status(401)
        .json({ success: false, message: "Some Error Accured" });
    }

    return res
      .status(200)
      .json({ success: true, completedRide: completedRide });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Interval Server Error " });
  }
}
