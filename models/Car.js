const mongoose = require("mongoose");
const carSchema = new mongoose.Schema(
  {
    Make: {
      type: String,
      required: true,
    },
    Model: {
      type: String,
      required: true,
    },
    Year: {
      type: Number,
      min: 1900,
      required: true,
    },
    TransmissionType: {
      type: String,
      enum: [
        "MANUAL",
        "AUTOMATIC",
        "AUTOMATED_MANUAL",
        "DIRECT_DRIVE",
        "UNKNOWN",
      ],
      required: true,
    },
    VehicleSize: {
      type: String,
      enum: ["Compact", "Midsize", "Large"],
      required: true,
    },
    VehicleStyle: {
      type: String,
      required: true,
    },
    MSRP: {
      type: Number,
      required: true,
    },
    isDeleted: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  }
);

// carSchema.pre(/^find/, function (next) {
// 	if (!('_conditions' in this)) return next();
// 	if (!('isDeleted' in carSchema.paths)) {
// 		delete this['_conditions']['all'];
// 		return next();
// 	}
// 	if (!('all' in this['_conditions'])) {
// 		//@ts-ignore
// 		this['_conditions'].isDeleted = false;
// 	} else {
// 		delete this['_conditions']['all'];
// 	}
// 	next();
// });

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
