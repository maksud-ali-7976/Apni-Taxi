import { Driver } from "../../model/driver.model.js";

export async function driversAddHandler(req, res) {
  try {
    const { name, salary, address, phone, vehicleType } = await JSON.parse(
      req.body.data
    );
    const image = req.file.path;
    const driver = await Driver.findOne({ name });
    if (driver) {
      return res
        .status(401)
        .json({ success: false, message: "Driver Already Added" });
    }

    const drivers = new Driver({
      name,
      address,
      phone,
      salary,
      vehicleType,
      image,
    });

    await drivers.save();

    return res
      .status(200)
      .json({ success: true, message: "Driver Added SuccessFully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Interval Server Error" });
  }
}

export async function fetchAllDriversHandler(req, res) {
  const { page = 1, limit = 10, search = "" } = await req.query;
  try {
    const query = {
      name: { $regex: search, $options: "i" },
    };

    const allDrivers = await Driver.find(query)
      .skip(Number(page - 1) * Number(limit))
      .limit(Number(limit));
    const total = await Driver.countDocuments(query);
    return res.status(200).json({
      success: true,
      drivers: allDrivers,
      total: total,
      page,
      totalPage: Math.ceil(total / limit),
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Interval Server Error" });
  }
}

export async function fetchParticularDriverForEdit(req, res) {
  const id = req.params.id;
  try {
    const driver = await Driver.findOne({ _id: id });
    if (!driver) {
      return res
        .status(401)
        .json({ success: false, message: "Driver Not Found" });
    }

    return res.status(200).json({ success: true, driver: driver });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Interval Server Error" });
  }
}

export async function updateParticularDriverHandler(req, res) {
  const id = req.params.id;
  const { name, vehicleType, address, phone, salary } = req.body.driverInfo;
  await Driver.findByIdAndUpdate(id, {
    $set: {
      name: name,
      vehicleType: vehicleType,
      address: address,
      salary: salary,
      phone: phone,
    },
  });

  return res.status(200).json({
    success: true,
    message: "Driver Information Updated Successfully",
  });
}

export async function handlerForPaidSalary(req, res) {
  const id = req.params.id;
  const { paidSalary } = req.body.paymentInfo;
  await Driver.findByIdAndUpdate(
    id,
    {
      $inc: { paidSalary },
    },
    { new: true }
  );

  return res
    .status(200)
    .json({ success: true, message: "Salary Paid Successfully" });
}

export async function handlerForDeleteDrivers(req, res) {
  const id = req.params.id;
  try {
    await Driver.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ success: true, message: "Driver Deleted SuccessFully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Interval Server Error" });
  }
}
