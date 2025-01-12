import { Schema, model } from "mongoose";
const driverSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  vehicleType: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
  },
  paidSalary: {
    type: Number,
    default:0
  },
  salaryStatus: {
    type: Boolean,
    default: false,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

export const Driver = model("driver", driverSchema);
