const express = require('express');
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/WebDatabase";
const Listing = require("./models/listing.js");




main()
.then(()=>{
    console.log("DB connected");
}).catch((err)=>{
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}
app.get("/",(req,res)=>{
    res.send("Hi");
});



app.get("/listingtest", async (req,res)=>{
    let sample = new Listing({
        title: "New villa",
        description:"This is new Villa",
        price: 1200,
        location: "California",
        country: "USA"
    });
    await sample.save();
    console.log("Data saved");
    res.send("Data Saved");
});

app.listen(port, ()=>{
     console.log("Listening");
});