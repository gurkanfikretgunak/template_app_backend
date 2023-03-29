const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_USER,
    pass: process.env.GOOGLE_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// TODO: Add styling
exports.sendEmail = function ({ toUser, code, type }) {
  var subject, message;

  switch (type) {
    case 0:
      subject = "Verify Account";
      message = "Your account has been created. Please enter the following code to verify your account.";
      break;
    case 1:
      subject = "Reset Password";
      message = `You recently requested to reset your password for your account. 
                 If you did not request a password reset, please ignore this email or reply to let us know.`;
      break;
    case 2:
      subject = "Change Email Address";
      message = `You recently requested to change your email address. 
                 If you did not request a password reset, please ignore this email or reply to let us know.`;
      break;
    default:
      title = "";
      message = "";
  }

  return new Promise((res, rej) => {
    message = {
      from: {
        name: 'Template App',
        address: process.env.GOOGLE_USER
      },
      to: toUser,
      subject: subject,
      text: "Hello! This email is from Template App",
      html: `
                <h3>Hello,</h3>
                <p>${message}</p>
                <p>- Template App Team</p>
                <p>Your code is: <span>${code}</span></p>
            `,
    };

    transporter.sendMail(message, function (err, info) {
      if (err) rej(err);
      else res(info);
    });
  });
};
