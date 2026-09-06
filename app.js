const express = require('express');
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/WebDatabase";
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js")
const ExpressError = require("./utils/ExpressError.js")
const {listingSchema} = require("./schema.js");

app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);



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

// Index Route
app.get("/listings", wrapAsync(async (req,res)=>{
     const allListings = await Listing.find({});
     res.render("listing/index.ejs", {allListings});
}));
// New Route
app.get("/listings/new", (req,res)=>{
    res.render("listing/new.ejs");
})
// Show Route
app.get("/listings/:id", wrapAsync(async (req, res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("listing/show.ejs", {listing});
}));

// Create Route
app.post("/listings", wrapAsync( async(req,res,next)=>{ 
    let result =  listingSchema.validate(req.body);
    console.log(result);
    if(result.error){
        throw new ExpressError(404, result.error);
    }
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
}));
// Edit Route
app.get("/listings/:id/edit", wrapAsync(async (req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("listing/edit.ejs", {listing});
}));
// Update Route
app.put("/listings/:id", wrapAsync(async (req,res)=>{
    if(!req.body.listing){
        throw new ExpressError(404, "Send Valid Data For Listing");
    }
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect("/listings");
}));
// Delete Route
app.delete("/listings/:id", wrapAsync(async(req, res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}));

app.all("/*splat", (req, res, next)=>{
 next(new ExpressError(404, "Page not Found!"));
})

app.use((err, req, res, next)=>{
    let {statusCode=500, message="Something went wrong!"} = err;
    // res.status(statusCode).send(message);  
    res.status(statusCode).render("listing/error.ejs", {message});
});
app.listen(port, ()=>{
     console.log("Listening");
});