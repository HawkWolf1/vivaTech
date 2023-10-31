const myTable = require('../models/userTable')
const otpTable = require('../models/otpTable')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const nodemailer = require("nodemailer");


function checkString(str) {
    if(str == undefined || str.length === 0){
        return true
    } else{
        return false
    }
}

const addUser = async (req, res, next) => {
    try{
    const {name, email, password} = req.body

    if(checkString(name) || checkString(email) || checkString(password)){
        return res.status(400).json({ err: "Bad parameters . Something is missing"})
        }
    
    const saltrounds =10
    bcrypt.hash(password, saltrounds, async(err, hash) =>{
        console.log(err)
       
    await myTable.create({ 
    name, 
    email, 
    password: hash })

    res.status(201).json({ message: 'New User created Successfully!' }) 
})
    }catch(err){
    res.status(500).json(err)
    }
}


function generateAccessToken(id, name){
    return jwt.sign({userId:id, name:name}, 'Rockettt')
}


const loginN = async (req, res, next) => {
    try{
    const {email, password} = req.body
    
    const xyz = await myTable.findAll({where :{email}})
        if(xyz.length >0){
            bcrypt.compare(password, xyz[0].password, async (err,result) => {
                if(err){
                    res.status(500).json({success: false, message: 'We got some error'})
                }
                if (result === true) {
                    
                    // const otp = generateOTP();

                    await otpTable.destroy({ where: { email } });
                    const otp = generateOTP();
                    await otpTable.create({ email, otp: otp });

                    const token = generateAccessToken(xyz[0].id, xyz[0].name);
                    console.log(token)


                    const emailTo = email; 

                    console.log(otp)

                    sendOTPByEmail(emailTo, otp)
                   

                    res.status(200).json({
                        success: true,
                        message: "otp sent successfully",
                        otpSent: true,
                        token: token
                    });
                }
                else{
                  return res.status(400).json({success: false, message: 'Password is incorrect'})
                }
                
            })
           

        } else{
            return res.status(404).json({success: false, message: 'No such User exists'})
        }
    }catch(err){
        res.status(500).json({message: err, success: false})
    }
}



function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000); 
}


function sendOTPByEmail(email, otp) {
    const transporter = nodemailer.createTransport({
        service: "Gmail", 
        auth: {
            user: "dummym947@gmail.com",
            pass: "acoz eqnx axpv znlg",
        },
    });

    const mailOptions = {
        from: "dummym947@gmail.com",
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




const verifyOTP = async (req, res) => {
    try {
        const enteredOTP = req.body.otp;

        const matchingOTP = await otpTable.findOne({ where: { otp: enteredOTP } });

        if (matchingOTP) {
            res.status(200).json({ success: true, message: 'OTP is verified' });
        } else {
            res.status(400).json({ success: false, message: 'Invalid OTP' });
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ success: false, message: 'An error occurred while verifying OTP' });
    }
};



const userInfo = (req, res) => {
    try {

      const { userId, name } = req.user;
  
      res.status(200).json({
        success: true,
        message: 'User data retrieved successfully',
        user: {
          userId,
          name,
        },
      });
    } catch (error) {
      console.error('An error occurred:', error);
      res.status(500).json({
        success: false,
        message: 'An error occurred while fetching user data',
      });
    }}




module.exports = {
    addUser,
    loginN,
    verifyOTP,
    userInfo
}