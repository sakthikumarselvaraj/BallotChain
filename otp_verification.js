// These imports and values are the same from the create source code. Perhaps you should keep them in the same file
// For the sake of demonstration, the imports are used here as well.
const crypto       = require("crypto");
const key          = "verysecretkey"; // Key for cryptograpy. Keep it secret

function verifyOTP(phone,hash,otp){
    // Seperate Hash value and expires from the hash returned from the user
    let [hashValue,expires] = hash.split(".");
    // Check if expiry time has passed
    let now = Date.now();
    if(now>parseInt(expires)) return false;
    // Calculate new hash with the same key and the same algorithm
    let data  = `${phone}.${otp}.${expires}`;
    let newCalculatedHash = crypto.createHmac("sha256",key).update(data).digest("hex");
    // Match the hashes
    if(newCalculatedHash === hashValue){
        return true;
    } 
    return false;
}