const nodemailer = require("nodemailer");

function generateAccessToken(id, name, isPremiumUser) {
    return jwt.sign({ userId: id, name: name, isPremiumUser }, "Rockettt");
}

const loginN = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const xyz = await myTable.findAll({ where: { email } });
        if (xyz.length > 0) {
            bcrypt.compare(password, xyz[0].password, (err, result) => {
                if (err) {
                    res
                        .status(500)
                        .json({ success: false, message: "We got some error" });
                }
                if (result === true) {
                    // Generate and send OTP
                    const otp = generateOTP(); // Implement generateOTP function
                    const emailTo = email; // User's email address

                    // Send OTP via email
                    sendOTPByEmail(emailTo, otp); // Implement sendOTPByEmail function

                    // Respond with a success message
                    res.status(200).json({
                        success: true,
                        message: "Login is successful",
                        otpSent: true,
                    });
                } else {
                    return res
                        .status(400)
                        .json({ success: false, message: "Password is incorrect" });
                }
            });
        } else {
            return res
                .status(404)
                .json({ success: false, message: "No such User exists" });
        }
    } catch (err) {
        res.status(500).json({ message: err, success: false });
    }
};

// Function to generate a random OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit OTP
}

// Function to send OTP via email
function sendOTPByEmail(email, otp) {
    const transporter = nodemailer.createTransport({
        service: "your-email-service", // e.g., "Gmail"
        auth: {
            user: "your-email@example.com",
            pass: "your-email-password",
        },
    });

    const mailOptions = {
        from: "your-email@example.com",
        to: email,
        subject: "OTP Verification",
        text: `Your OTP is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error sending OTP: " + error);
        } else {
            console.log("OTP sent: " + info.response);
        }
    });
}
