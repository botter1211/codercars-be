const mongoose = require("mongoose");
const Car = require("../models/Car");
const carController = {};

carController.createCar = async (req, res, next) => {
  try {
    const {
      Make,
      Model,
      Year,
      TransmissionType,
      VehicleSize,
      VehicleStyle,
      MSRP,
    } = req.body;
    if (
      !Make ||
      !Model ||
      !Year ||
      !TransmissionType ||
      !VehicleSize ||
      !VehicleStyle ||
      !MSRP
    ) {
      const exception = new Error("Missing required information");
      throw exception;
    }
    const carNew = await new Car({
      Make: Make,
      Model: Model,
      Year: Year,
      TransmissionType: TransmissionType,
      VehicleSize: VehicleSize,
      VehicleStyle: VehicleStyle,
      MSRP: MSRP,
    }).save();

    const response = {
      message: "Create car successfully!",
      car: carNew,
    };
    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
};

carController.getCars = async (req, res, next) => {
  let { page, ...filterQuery } = req.query;

  try {
    const filterKeys = Object.keys(filterQuery);
    console.log(filterQuery);
    if (filterKeys.length) {
      const exception = new Error("Only page query");
      throw exception;
    }

    let allCars = await Car.find();
    allCars = allCars.filter((item) => item.isDeleted === false);
    const totalPages = parseInt(allCars.length / 10);

    page = parseInt(page) || 1;
    let limit = 10;
    let offset = limit * (page - 1);
    allCars = allCars.slice(offset, offset + limit);

    const response = {
      message: "Get car list successfully!",
      page: page,
      total: totalPages,
      cars: allCars,
    };

    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
};

carController.editCar = async (req, res, next) => {
  try {
    let { id } = req.params;

    console.log(id);
    const updates = req.body;

    let updatedCar = await Car.findByIdAndUpdate(
      id,
      { ...updates },
      { new: true }
    );
    const response = { message: "Update car successfully!", car: updatedCar };

    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
};

carController.deleteCar = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  try {
    let deletedCar = await Car.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
    const response = { message: "Delete car successfully!", car: deletedCar };
    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
};

module.exports = carController;
