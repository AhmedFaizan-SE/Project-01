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
const {listingSchema, reviewSchema} = require("./schema.js");
const Review = require("./models/review.js");
const listings = require("./routes/listing.js");

app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname, "public"), { maxAge: "1d" }));
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



const validateReview= (req, res, next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=> el.message).join(",");
        throw new ExpressError(404, errMsg);
    } else next();
}

app.use("/listings", listings);

app.get("/",(req,res)=>{
    res.send("Hi");
});


// Post revivew

app.post("/listings/:id/reviews",validateReview, wrapAsync( async(req, res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    res.redirect(`/listings/${listing._id}`);

}));
// Delete Review

app.delete("/listings/:id/reviews/:reviewId", wrapAsync(async(req, res)=>{
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${id}`);
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