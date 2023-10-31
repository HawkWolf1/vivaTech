async function verifyOTP(event) {
    event.preventDefault();

    const otp = document.getElementById('otp').value;
    console.log(otp)

    if (!otp) {
        alert("Please enter a valid OTP.");
        return;
    }

    try {
        const response = await axios.post("http://localhost:4000/user/verify-otp", { otp });

        if (response.status === 200) {
            alert(response.data.message);
            window.location.href = "./userprofile.html";
        } else {
            document.getElementById('verification-status').textContent = "Invalid OTP. Please try again.";
        }
    } catch (error) {
        console.error("Error verifying OTP:", error);
        document.getElementById('verification-status').textContent = "An error occurred while verifying OTP. Please try again later.";
    }
}
