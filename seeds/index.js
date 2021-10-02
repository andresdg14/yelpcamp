const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "611fe2e6fa2a7608f06155d5",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dwfk8dym4/image/upload/v1629664869/YelpCamp/x5vbt5wjcqu2blauneq0.jpg",
          filename: "YelpCamp/x5vbt5wjcqu2blauneq0",
        },
        {
          url: "https://res.cloudinary.com/dwfk8dym4/image/upload/v1630866826/YelpCamp/iczhjwswvg1ls2j6tlxa.jpg",
          filename: "YelpCamp/iczhjwswvg1ls2j6tlxa",
        },
      ],
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur volutpat sapien vitae ligula tincidunt, in tempor velit dapibus. Integer lacus metus, dictum vel accumsan eu, semper id dolor.",
      price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
