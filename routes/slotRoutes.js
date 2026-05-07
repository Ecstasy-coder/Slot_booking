router.post("/book-slot", async (req, res) => {

  try {

    const { name, email, date, time } = req.body;

    // Find available slot
    const slot = await Slot.findOne({
      date,
      time,
      isBooked: false
    });

    if (!slot) {
      return res.status(400).json({
        message: "Slot not available"
      });
    }

    // Mark slot booked
    slot.isBooked = true;

    await slot.save();

    // Meeting link
    const meetingLink =
      "https://meet.google.com/fsg-tqfk-ejz";

    // Send email safely
    try {

      await sendEmail(
        email,
        name,
        meetingLink,
        date,
        time
      );

      console.log("Email sent");

    } catch (emailError) {

      console.log("Email error:", emailError);

    }

    // ALWAYS send response
    return res.status(200).json({
      success: true,
      message: "Slot booked successfully"
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

});
