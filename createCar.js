// const fs = require("fs");
const csv = require("csvtojson");
const fs = require("fs");

const createCar = async () => {
  let newData = await csv().fromFile("./data.csv");
  let data = JSON.parse(fs.readFileSync("./cars.json"));
  newData = newData.map((e) => {
    return {
      make: e.Make,
      model: e.Model,
      release_date: parseInt(e.Year),
      transmission_type: e.TransmissionType,
      size: e.VehicleSize,
      style: e.VehicleStyle,
      price: parseInt(e.MSRP),
    };
  });
  console.log(newData);
  data.car = newData;
  fs.writeFileSync("./cars.json", JSON.stringify(data));
};

createCar();
