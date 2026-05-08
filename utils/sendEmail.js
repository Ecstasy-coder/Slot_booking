const nodemailer = require("nodemailer");

const sendEmail = async (
  to,
  name,
  meetingLink,
  date,
  time
) => {

  try {
const transporter =
nodemailer.createTransport({

  host: "smtp.gmail.com",

  port: 587,

  secure: false,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },

  tls: {
    rejectUnauthorized: false
  }

});
    

    const mailOptions = {

      from: process.env.EMAIL_USER,

      to: to,

      subject:
      `Confirmed: ECSTASY Solutions Demo on ${date} at ${time}`,

      html: `
      <div style="
        font-family: Arial;
        padding: 20px;
        line-height: 1.6;
      ">

        <h2 style="color:#006bff;">
          Meeting Confirmed ✅
        </h2>

        <p>
          Hi <b>${name}</b>,
        </p>

        <p>
          Your <b>ECSTASY Solutions</b>
          meeting is confirmed!
        </p>

        <hr>

        <p>
          📅 <b>Date:</b> ${date}<br>
          ⏰ <b>Time:</b> ${time} IST<br>
          🔗 <b>Join Meeting:</b><br>

          <a href="${meetingLink}"
             style="
               background:#006bff;
               color:white;
               padding:10px 16px;
               text-decoration:none;
               border-radius:6px;
               display:inline-block;
               margin-top:8px;
             ">
             Click Here to Join
          </a>
        </p>

        <br>

        <p>
          See you soon!<br>
          <b>Rakesh</b><br>
          Ecstasy Solutions
        </p>

      </div>
      `

    };

    const info =
    await transporter.sendMail(mailOptions);

    console.log(
      "Email Sent:",
      info.response
    );

  }

catch(error){

   console.log("Email Error:", error);

   throw error;
}

};

module.exports = sendEmail;
