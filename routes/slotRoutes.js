const express = require("express");
const router = express.Router();

const Slot = require("../models/Slot");
const sendEmail = require("../utils/sendEmail");


// ===============================
// GET available slots by date
// ===============================

router.get("/slots/:date", async (req, res) => {

  try {

    const slots = await Slot.find({
      date: req.params.date,
      isBooked: false
    });

    return res.json(slots);

  } catch (error) {

    return res.status(500).json({
      message: error.message
    });

  }

});


// ===============================
// POST Book Slot + Send Email
// ===============================

router.post("/book-slot", async (req, res) => {

  try {

    const { name, email, date, time } = req.body;

    // Find available slot
    const slot = await Slot.findOne({
      date,
      time,
      isBooked: false
    });

    // Slot not available
    if (!slot) {

      return res.status(400).json({
        message: "Slot not available"
      });

    }

    // Mark slot as booked
    slot.isBooked = true;

    await slot.save();

    // Temporary meeting link
    const meetingLink =
      "https://meet.google.com/fsg-tqfk-ejz";

    // Send email
    await sendEmail(
      email,
      name,
      meetingLink,
      date,
      time
    );

    // Send ONLY ONE response
    return res.status(200).json({
      success: true,
      message: "Slot booked & email sent successfully"
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

});


// ===============================
// Export router
// ===============================

module.exports = router;