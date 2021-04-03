const otpGenerator = require("otp-generator");
const crypto       = require("crypto");
const key          = "verysecretkey"; // Key for cryptograpy. Keep it secret

function createNewOTP(mobileno){
    // Generate a 6 digit numeric OTP
    const otp      = otpGenerator.generate(6, {alphabets: false, upperCase: false, specialChars: false});
    const ttl      = 5 * 60 * 1000; //5 Minutes in miliseconds
    const expires  = Date.now() + ttl; //timestamp to 5 minutes in the future
    const data     = `${mobileno}.${otp}.${expires}`; // phone.otp.expiry_timestamp
    const hash     = crypto.createHmac("sha256",key).update(data).digest("hex"); // creating SHA256 hash of the data
    const fullHash = `${hash}.${expires}`; // Hash.expires, format to send to the user
    // you have to implement the function to send SMS yourself. For demo purpose. let's assume it's called sendSMS
    sendSMS(mobileno,`Your OTP is ${otp}. it will expire in 5 minutes`);
    return fullHash;
}