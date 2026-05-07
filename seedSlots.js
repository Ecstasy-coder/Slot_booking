require("dotenv").config();

const mongoose = require("mongoose");
const Slot = require("./models/Slot");

mongoose.connect(process.env.MONGO_URI)

.then(async () => {

  console.log("MongoDB Connected");

  // Delete old slots
  await Slot.deleteMany({});
  console.log("Old slots deleted");

  let slots = [];

  // Generate time slots (11 AM to 8 PM)
  function generateTimeSlots() {

    const startHour = 11;
    const endHour = 20; // 8 PM
    const interval = 20; // minutes

    let times = [];

    for (let hour = startHour; hour <= endHour; hour++) {

      for (let min = 0; min < 60; min += interval) {

        if (hour === endHour && min > 0)
          break;

        const h =
          hour.toString().padStart(2, "0");

        const m =
          min.toString().padStart(2, "0");

        times.push(`${h}:${m}`);

      }

    }

    return times;
  }

  const times = generateTimeSlots();

  // Create slots for 365 days
  for (let i = 0; i < 365; i++) {

    const dateObj = new Date();

    dateObj.setDate(
      dateObj.getDate() + i
    );

    const date =
      dateObj.toISOString()
      .split("T")[0];

    times.forEach(time => {

      slots.push({

        date: date,
        time: time,
        isBooked: false

      });

    });

  }

  await Slot.insertMany(slots);

  console.log(
    "Slots created from 11AM to 8PM with 20-min intervals for 365 days"
  );

  mongoose.disconnect();

})

.catch(err =>
  console.log(err));