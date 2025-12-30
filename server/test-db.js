const mongoose = require('mongoose');

// PASTE YOUR FULL CONNECTION STRING BELOW (Between the quotes)
// Example: "mongodb+srv://admin:password123@cluster0.abcde.mongodb.net/gearguard?retryWrites=true&w=majority"
const uri = "mongodb+srv://daivik:gear123456@cluster0.3ajwtup.mongodb.net/?appName=Cluster0";

console.log("---------------------------------------------------");
console.log("Testing Connection...");
console.log("---------------------------------------------------");

mongoose.connect(uri)
    .then(() => {
        console.log("✅ SUCCESS! The username and password are CORRECT.");
        console.log("You can copy this string into your .env file now.");
        process.exit(0);
    })
    .catch((err) => {
        console.log("❌ FAILED!");
        console.log("Reason:", err.codeName || err.name);
        console.log("Message:", err.message);
        console.log("---------------------------------------------------");
        console.log("Tips:");
        if (err.message.includes('bad auth')) {
            console.log("1. Your Password is wrong.");
            console.log("2. Your Username is wrong (check for spaces).");
            console.log("3. You might be using your Google Login instead of a Database User.");
        } else if (err.code === 'ENOTFOUND') {
            console.log("1. The URL address is wrong (check the 'cluster0' part).");
        }
        process.exit(1);
    });